import { get } from 'lodash-es';
import React, { createContext, useContext, useState } from 'react';
import {
  type PanelsAndModalsContext,
  type PanelsAndModalsMap,
} from '@kurocado-studio/formkit-ui';
import { QuestionCreatorPanel } from '../components/QuestionCreatorPanel';
import { ModalsAndPanelsViewsEnum } from '../enums';

const { UNKNOWN, FORM_DESIGNER_PANEL, QUESTION_SELECTOR_PANEL } =
  ModalsAndPanelsViewsEnum;

const panelsAndModalsDefaultState: PanelsAndModalsMap = {
  [FORM_DESIGNER_PANEL]: false,
  [QUESTION_SELECTOR_PANEL]: false,
  [UNKNOWN]: false,
};

const PanelsAndModalsContext = createContext<PanelsAndModalsContext>({
  handlePanelsAndModalsState: () => {},
  panelsAndModalsState: panelsAndModalsDefaultState,
});

export function PanelsAndModalsProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [panelsAndModalsState, setPanelsAndModalsState] =
    useState<PanelsAndModalsMap>(panelsAndModalsDefaultState);

  const handlePanelsAndModalsState = (
    payload: ModalsAndPanelsViewsEnum,
  ): void => {
    const panelsAndModalsMap: PanelsAndModalsMap = {
      [FORM_DESIGNER_PANEL]: false,
      [QUESTION_SELECTOR_PANEL]: false,
      [UNKNOWN]: false,
    };

    setPanelsAndModalsState((previousState) => {
      const nextSelectedState = get(previousState, [payload]);
      return {
        ...panelsAndModalsMap,
        [payload]: !nextSelectedState,
      };
    });
  };

  return (
    <PanelsAndModalsContext.Provider
      value={{ panelsAndModalsState, handlePanelsAndModalsState }}
    >
      {children}
      <QuestionCreatorPanel />
    </PanelsAndModalsContext.Provider>
  );
}

export const usePanelsAndModalsContext = (): PanelsAndModalsContext => {
  return useContext(PanelsAndModalsContext);
};
