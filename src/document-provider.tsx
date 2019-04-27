import React, {
  createContext,
  ReactNode,
  HtmlHTMLAttributes,
  HTMLAttributes,
  useMemo,
} from 'react';

export const DocumentContext = createContext({
  registerHtmlAttributes: (props: HTMLProps) => {},
  registerBodyAttributes: (props: BodyProps) => {},
});

export const DocumentProvider = ({
  htmlAttributes,
  bodyAttributes,
  children,
}: DocumentProviderProps) => {
  const value = useMemo(
    () => ({
      registerHtmlAttributes: (props: HTMLProps) => {
        Object.assign(htmlAttributes, props);
      },
      registerBodyAttributes: (props: BodyProps) => {
        Object.assign(bodyAttributes, props);
      },
    }),
    [],
  );

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export type HTMLProps = HtmlHTMLAttributes<HTMLHtmlElement>;
export type BodyProps = HTMLAttributes<HTMLBodyElement>;

export type DocumentProviderProps = {
  htmlAttributes: HTMLProps;
  bodyAttributes: BodyProps;
  children?: ReactNode;
};
