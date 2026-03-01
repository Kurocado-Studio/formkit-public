import { get, set } from 'lodash-es';
import React, { createContext, useContext, useState } from 'react';

import {
  PanelsContextType,
  PanelsMap,
} from '@/processes/form-designer/presentation/types';
import { PanelsViewsEnum } from '@/shared/contracts/enums';

const {
  UNKNOWN,
  QUESTION_CONFIGURATION,
  QUESTION_CREATOR,
  VARIANT_CONFIGURATION,
  VARIANT_CREATOR,
  FORM_CONFIGURATION,
} = PanelsViewsEnum;

const panelsDefaultState: PanelsMap = {
  [QUESTION_CONFIGURATION]: false,
  [FORM_CONFIGURATION]: true,
  [QUESTION_CREATOR]: false,
  [VARIANT_CONFIGURATION]: false,
  [VARIANT_CREATOR]: false,
  [UNKNOWN]: false,
};

const panelsAllClosedState: PanelsMap = Object.fromEntries(
  (Object.keys(panelsDefaultState) as Array<PanelsViewsEnum>).map((k) => [
    k,
    false,
  ]),
) as PanelsMap;

const PanelsContext = createContext<PanelsContextType>({
  handlePanelsState: () => {},
  handleTogglePanel: () => {},
  handleToggleOffStateExceptFor: () => {},
  panelsState: panelsDefaultState,
});

export function PanelsProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [panelsState, setPanelsState] = useState<PanelsMap>(panelsDefaultState);

  const handlePanelsState: PanelsContextType['handlePanelsState'] = (
    payload,
  ) => {
    setPanelsState((previousState) => {
      return {
        ...previousState,
        ...payload,
      };
    });
  };

  const handleToggleOffStateExceptFor: PanelsContextType['handleToggleOffStateExceptFor'] =
    (payload) => {
      setPanelsState(() => {
        // #region agent log
        const nextState = { ...panelsAllClosedState };

        for (const item of payload) {
          set(nextState, [item], true);
        }

        return nextState;
      });
    };

  const handleTogglePanel = (payload: PanelsViewsEnum): void => {
    setPanelsState((previousState) => {
      const nextSelectedState = get(previousState, [payload]);
      return {
        ...previousState,
        [payload]: !nextSelectedState,
      };
    });
  };

  const value = React.useMemo(
    () => ({
      panelsState,
      handlePanelsState,
      handleToggleOffStateExceptFor,
      handleTogglePanel,
    }),
    [panelsState],
  );
  return (
    <PanelsContext.Provider value={value}>{children}</PanelsContext.Provider>
  );
}

export const usePanelsContext = (): PanelsContextType => {
  return useContext(PanelsContext);
};
