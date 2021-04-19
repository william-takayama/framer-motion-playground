import produce from "immer";
import { useCallback, useEffect, useMemo, useReducer } from "react";

type ReducerAction =
  | {
      type: "NEXT_SLIDE";
      length: number;
    }
  | {
      type: "PREVIOUS_SLIDE";
      length: number;
    }
  | {
      type: "INFINITE";
      length: number;
    };

type ReducerState = {
  index: number;
  direction: number;
  length: number;
};

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  return produce(state, (draft) => {
    if (action.type === "NEXT_SLIDE") {
      if (state.index + 1 >= action.length) {
        draft.index = action.length - 1;
        draft.direction = 1;
        return;
      }

      draft.index = state.index + 1;
      draft.direction = 1;
    }

    if (action.type === "PREVIOUS_SLIDE") {
      if (state.index - 1 < 0) {
        draft.index = 0;
        draft.direction = -1;
        return;
      }

      draft.index = state.index - 1;
      draft.direction = -1;
    }

    if (action.type === "INFINITE") {
      if (draft.index < action.length - 1) {
        draft.index = state.index + 1;
        return;
      }

      if (draft.index === action.length - 1) {
        draft.index = 0;
      }
    }
  });
}

type Options = {
  autoSlide?: boolean;
  TIMEOUT?: number;
};

export function useCarousel({
  images,
  options
}: {
  images: string[];
  options?: Options;
}) {
  const initialState = {
    index: 0
  } as ReducerState;

  const [{ index, direction }, send] = useReducer<typeof reducer>(
    reducer,
    initialState
  );

  const next = useCallback(() => {
    send({ type: "NEXT_SLIDE", length: images.length });
  }, [images]);

  const previous = useCallback(() => {
    send({ type: "PREVIOUS_SLIDE", length: images.length });
  }, [images]);

  useEffect(() => {
    if (options?.autoSlide) {
      setTimeout(() => {
        send({ type: "INFINITE", length: images.length });
      }, options?.TIMEOUT ?? 6000);
    }

    return () => clearTimeout();
  }, [options, images.length]);

  const [hasLeftSlide, hasRightSlide] = useMemo(() => {
    function getStatusSide(index: number, length: number) {
      const cases = {
        [String(index === 0)]: [false, true],
        [String(index === length - 1)]: [true, false]
      };

      return cases["true"] ?? [true, true];
    }

    return getStatusSide(index, images.length);
  }, [images, index]);

  return useMemo(
    () => ({
      index,
      direction,
      next,
      previous,
      hasLeftSlide,
      hasRightSlide
    }),
    [next, previous, index, direction, hasRightSlide, hasLeftSlide]
  );
}
