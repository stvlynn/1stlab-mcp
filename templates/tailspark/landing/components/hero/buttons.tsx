"use client";

import React, { useEffect, useState } from "react";

import Github from "./github";

export default function () {
  return (
    <div className="my-2 md:my-6 mx-auto text-center flex">
      <div className="mx-auto flex items-center">
        <Github owner="stvlynn" repo="1stlab-mcp" interval={6000} />
      </div>
    </div>
  );
}
