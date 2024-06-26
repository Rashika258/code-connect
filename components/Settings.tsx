"use client";

import { useSettingsContext } from "@/contexts/SettingsContext";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useAnimationControls, useDragControls, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Select from "./Select";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { SUPPORTED_PADDING_CHOICES, SUPPORTED_THEMES } from "@/lib/themes";
import Toggle from "./Toggle";
import Choices from "./Choices";
import { SUPPORTED_FONT_STYLES } from "@/lib/fonts";
import {
  FontDefinition,
  LanguageDefinition,
  ThemeDefinition,
} from "@/lib/types";
const Settings = () => {
  const [mainDimensions, setMainDimensions] = useState<{
    height: number;
    width: number;
  }>({
    height: 0,
    width: 0,
  });

  const [constraints, setConstraints] = useState<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>({ top: 0, left: 0, right: 0, bottom: 0 });

  const {
    language,
    setLanguage,
    theme,
    setTheme,
    fontStyle,
    setFontStyle,
    lineNumbers,
    setLineNumbers,
    padding,
    setPadding,
  } = useSettingsContext();

  const dragControls = useDragControls();
  const animationControls = useAnimationControls();

  useEffect(() => {
    const main = document.getElementById("main");
    const timeOutId = NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        setMainDimensions({
          height: main!.offsetHeight,
          width: main!.offsetWidth,
        });

        animationControls.start({
          x: 0,
          y: 0,
        });
      }, 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeOutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const settings = document.getElementById("settings");

    setConstraints({
      top: -settings!.offsetTop + 24,
      left:
        -mainDimensions.width +
        settings!.offsetWidth +
        settings!.offsetLeft +
        24,
      right:
        mainDimensions.width -
        settings!.offsetWidth -
        settings!.offsetLeft -
        24,
      bottom:
        mainDimensions.height -
        settings!.offsetHeight -
        settings!.offsetTop -
        24,
    });
  }, [mainDimensions.height, mainDimensions.width]);

  return (
    <motion.section
      drag
      dragListener
      dragMomentum
      dragControls={dragControls}
      dragConstraints={constraints}
      animate={animationControls}
      className={clsx(
        "fixed bottom-32 z-10 rounded-xl p-5 text-xs",
        "transition-opacity duration-200 ease-in-out will-change-transform",
        "border-[1px] border-white/20 bg-black text-white/70 opacity-50 shadow-xl",
        "focus-within:opacity-100 hover:opacity-100"
      )}
    >
      <motion.div
        onPointerDown={(e) =>
          dragControls.start(e, {
            snapToCursor: false,
          })
        }
        whileTap={{
          cursor: "grabbing",
        }}
        className={clsx(
          "absolute -top-[10px] left-1/2 py-[1px] px-[6px]",
          "rounded-md border-[1px] border-white/20 bg-black",
          "transition-all duration-200 ease-in-out will-change-transform",
          "hover:scale-150 hover:cursor-grab hover:bg-gray-800 focus:outline-none"
        )}
      >
        <DragHandleDots2Icon className="rotate-90" />
      </motion.div>
      <div className={clsx("flex gap-8", "")}>
        <div>
          <label htmlFor="language">Language</label>
          <Select
            type="language"
            initialValue={language}
            setValue={
              setLanguage as (
                _: LanguageDefinition | ThemeDefinition | FontDefinition
              ) => void
            }
            options={SUPPORTED_LANGUAGES}
          />
        </div>
        <div>
          <label htmlFor="theme">Theme</label>
          <Select
            type="theme"
            initialValue={theme}
            setValue={
              setTheme as (
                _: LanguageDefinition | ThemeDefinition | FontDefinition
              ) => void
            }
            options={SUPPORTED_THEMES}
          />
        </div>
        <div>
          <label htmlFor="font">Font</label>
          <Select
            type="font"
            initialValue={fontStyle}
            setValue={
              setFontStyle as (
                _: LanguageDefinition | ThemeDefinition | FontDefinition
              ) => void
            }
            options={SUPPORTED_FONT_STYLES}
          />
        </div>
        <div>
          <label htmlFor="lineNumbers">Line Numbers</label>
          <Toggle initialValue={lineNumbers} setValue={setLineNumbers} />
        </div>
        <div>
          <label htmlFor="padding">Padding</label>
          <Choices
            initialValue={padding}
            setValue={setPadding}
            choices={SUPPORTED_PADDING_CHOICES}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Settings;
