import React from "react";
import { useState } from "react";

export default function CoachAndSubs(props){

    const coach = props.coach;
    const substitutes = props.substitutes;

    return(
        <div>
            <div className="flex flex-row justify-start gap-2">
                          <img class="w-10 h-10 sm:w-14 sm:h-14 rounded-full" alt="" src={coach.photo} />
                          <span className="border-none flex justify-center items-center text-sm sm:text-lg">Coach: {coach.name}</span>
                        </div>
                        <div>
                          {substitutes.map((sub, index) => {
                            return (
                              <div key={index} className="flex flex-row justify-between p-1 border-b border-solid border-slate-400">

                                <span className="flex space-x-3 border-none text-sm sm:text-lg">
                                  {sub.player.number}&nbsp;&nbsp;{sub.player.name}
                                </span>
                                <span className="border-none text-sm sm:text-lg flex justify-center items-center">{
                                  sub.player.pos === 'D' ? 'Defender'
                                    : sub.player.pos === 'M' ? 'Midfielder'
                                      : sub.player.pos === 'F' ? 'Forward'
                                        : sub.player.pos === 'G' ? 'GoalKeeper'
                                          : null
                                }</span>
                              </div>
                            );
                          })}
                        </div>
        </div>
    )
}