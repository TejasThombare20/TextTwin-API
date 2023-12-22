"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Highlight, themes, Language } from "prism-react-renderer";
import { Line, LineNo, LineContent, Pre } from "@/helpers/Style";

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animantionDelay?: number;
  animated?: boolean;
}

const Code = ({
  code,
  show,
  language,
  animantionDelay,
  animated,
}: CodeProps) => {
  const { theme: applicationTheme } = useTheme();
  const [text, settext] = useState(animated ? "" : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          settext(code.slice(0, i));
          i++;
          if (i > code?.length) {
            // if (i > 10) {
            clearInterval(intervalId);
          }
        }, 15);

        return () => clearInterval(intervalId);
      }, animantionDelay || 150);
    }
  }, [code, show, animated, animantionDelay]);

  //   number of lines
  const lines = text?.split(/\r\n|\r|\n/)?.length;
  // const lines = 10;
  const theme =
    applicationTheme === "light" ? themes.nightOwlLight : themes.nightOwl;

  return (
    <Highlight theme={theme} code={text} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};

export default Code;
