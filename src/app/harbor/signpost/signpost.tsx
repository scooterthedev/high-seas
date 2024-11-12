"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Verification from "./verification";
import Platforms from "@/app/utils/wakatime-setup/platforms";
import JaggedCard from "../../../components/jagged-card";
import Cookies from "js-cookie";
import FeedItems from "./feed-items";
import { getWakaSessions } from "@/app/utils/waka";

export default function Signpost() {
  let wakaKey: string | null = null;
  let hasHb: boolean | null = null;
  const wakaCookie = Cookies.get("waka");
  if (wakaCookie) {
    try {
      const parsedCookie = JSON.parse(wakaCookie);
      if (Object.hasOwn(parsedCookie, "key")) {
        wakaKey = parsedCookie.key;
      } else {
        throw new Error(
          "The parsed waka cookie has no key 'key' (the waka api key)",
        );
      }

      if (Object.hasOwn(parsedCookie, "hasHb")) {
        hasHb = parsedCookie.hasHb;
      } else {
        throw new Error("The parsed waka cookie has no key 'hasHb'");
      }
    } catch (e) {
      console.error("Couldn't JSON parse the waka cookie: ", e);
    }
  }

  const [wakaSessions, setWakaSessions] =
    useState<{ key: string; total: number }[]>();

  useEffect(() => {
    getWakaSessions().then((s) => {
      setWakaSessions(s.projects)
      if (s.projects.length > 0 ) {
        hasHb = true
      }
    });
  }, []);

  const hms = wakaSessions
    ? new Date(wakaSessions.reduce((a, p) => (a += p.total), 0) * 1_000)
        .toISOString()
        .slice(11, 19)
        .split(":")
        .map((s) => Number(s))
    : null;

  // Show or hide instructions for installing hakatime
  const [showInstructions, setShowInstructions] = useState(!hasHb);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white"
    >
      <h1 className="font-heading text-5xl font-bold text-white mb-2 text-center">
        The Signpost
        <img src="/signpost.png" width={32} className="inline-block ml-4 hidden sm:inline"></img>
      </h1>

      <p className="text-center text-white text-xs sm:text-sm mb-8">
        Have questions? Need help? Post in{" "}
        <Link
          className="text-blue-500"
          href="https://hackclub.slack.com/archives/C07PZNMBPBN"
        >
          #high-seas-help
        </Link>
        !
      </p>

      <Verification />

      <div className="text-center mb-2">
        <h2 className="font-heading text-2xl font-bold">Stats</h2>
        <p className="text-md md:text-lg">
          {hasHb 
            ? (<>{hms
              ? (<p>
                  <span>You've logged {hms[0]} hour{hms[0] !== 1 ? "s" : ""}, {hms[1]} minute{hms[1] !== 1 ? "s" : ""}, </span>
                  <br className="sm:hidden"></br>
                  <span>and {hms[2]} second{hms[2] !== 1 ? "s" : ""} of coding time so far!</span>
                </p>)
              : "Project time loading..."}
            </>) : (
            <>
              You have <b>NOT</b> set up Hakatime. Your hours are <b>not</b>{" "}
              being tracked!
            </>
          )}
        </p>
        <p>
          
        </p>
      </div>

      <JaggedCard shadow={false} small={!showInstructions}>
        {wakaKey ? (
          <Platforms wakaKey={wakaKey} hasHb={hasHb} showInstructions={showInstructions} setShowInstructions={setShowInstructions} />
        ) : (
          <p>Loading Hakatime token...</p>
        )}
      </JaggedCard>

      <h2 className="mt-8 font-heading text-2xl font-bold mb-4 text-center">
        What's happening?
      </h2>
      <FeedItems />

      <h2 className="mt-8 font-heading text-2xl font-bold text-center">
        Special prizes
      </h2>
      <p className="mt-2 text-lg font-bold mb-4 text-center">Winners for these will be chosen at end of event!</p>
    </motion.div>
  );
}
