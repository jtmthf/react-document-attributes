import { useContext, useEffect } from 'react';
import { BodyProps, DocumentContext, HTMLProps } from './document-provider';

function createHook(html: true): (attributes: HTMLProps) => void;
function createHook(html: false): (attributes: BodyProps) => void;
function createHook(
  html: boolean,
): (attributes: HTMLProps & BodyProps) => void {
  return attributes => {
    const { registerBodyAttributes, registerHtmlAttributes } = useContext(
      DocumentContext,
    );

    html
      ? registerHtmlAttributes(attributes)
      : registerBodyAttributes(attributes);

    useEffect(() => {
      const copy = Object.keys(attributes).map(key => [
        key,
        html
          ? document.documentElement[key as keyof HTMLElement]
          : document.body[key as keyof HTMLElement],
      ]);
      Object.assign(
        html ? document.documentElement : document.body,
        attributes,
      );

      return () => {
        Object.assign(html ? document.documentElement : document.body, copy);
      };
    }, [...Object.keys(attributes), ...Object.values(attributes)]);
  };
}

export const useHtmlAttributes = createHook(true);
export const useBodyAttributes = createHook(false);
