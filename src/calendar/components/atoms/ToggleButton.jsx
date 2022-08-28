import React, { useState } from "react";
import { Switch } from "@headlessui/react";

export const ToggleButton = ({ toggleFunction, enabled }) => {
  return (
    <Switch.Group>
      <div className="flex items-center justify-center">
        <Switch.Label className="text-white font-bold text-sm mr-2">
          ENG
        </Switch.Label>
        <Switch
          checked={enabled}
          onChange={toggleFunction}
          className={`${
            enabled ? "bg-green-600" : "bg-blue-500"
          } relative inline-flex h-5 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white`}
          />
        </Switch>
        <Switch.Label className="mr-4 text-white font-bold text-sm ml-2">
          ESP
        </Switch.Label>
      </div>
    </Switch.Group>
  );
};
