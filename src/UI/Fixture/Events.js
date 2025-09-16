import { useState, useMemo, memo, useEffect } from "react";
import getEvents from '../../api/Events.js'
import '../../styles/events.css'
import penalty from '../../icons/penalty.png';
import missed_penalty from '../../icons/missed_penalty.png'
import { faSoccerBall, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import VAR from '../../icons/var.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../../Components/Spinner.jsx";
import { getTranslation } from "../../Translation/labels.js";
import { useSelector, useDispatch } from "react-redux";
import { requestsIncrement, resetRequests } from "../../ReduxStore/counterSlice.js";


function Events(props) {

    const fixtureId = props.fixtureId;
    const teams = props.teams;
    const [events, setEvents] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const requests_count = useSelector(state => state.counter.requestsCount);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchEvents() {
            const eventsData = await getEvents(fixtureId);
            setEvents(eventsData.data.response);
            setLoaded(true);

            //redux reducer increase requests count by one:
            dispatch(requestsIncrement);
        }

        if (requests_count < 10) {
            fetchEvents();
        }
        else {
            alert("API request limit reached. Please wait a minute before making more requests.");
        }

        //reset api requests to zero
        dispatch(resetRequests());

    }, [fixtureId])

    const lang = JSON.parse(localStorage.getItem('user_preferences'))?.lang || 'en';

    const events_div = (teamId, player, assist, type, detail, index, comments) => {

        return (
            <div key={index} className={`flex ${teamId !== teams.home.id ? 'flex-row-reverse' : null} items-center`}>
                <div className="px-2 sm:px-3">{
                    type === 'Goal' && detail === 'Normal Goal' ?
                        <FontAwesomeIcon icon={faSoccerBall} size='2x' className="text-xl sm:text-3xl" color="green" /> :
                        type === 'Goal' && detail === 'Penalty' ?
                            <img alt='' src={penalty} className="w-8 h-6 sm:w-12 sm:h-8" /> :
                            type === 'Goal' && detail === 'Own Goal' ?
                                <FontAwesomeIcon icon={faSoccerBall} size="2x" className="text-xl sm:text-3xl" color="red" /> :
                                type === 'Goal' && detail === 'Missed penalty' ?
                                    <img alt='' src={missed_penalty} className="sm:w-8 sm:h-8" /> :
                                    type === 'Card' && detail === 'Yellow Card' ?
                                        <div className="w-4 h-6 sm:w-6 sm:h-10 bg-yellow-500"></div> :
                                        type === 'Card' && detail === 'Red Card' ?
                                            <div className="w-4 h-6 sm:w-6 sm:h-10 bg-red-700"></div> :
                                            type === 'subst' ?
                                                <FontAwesomeIcon icon={faRightLeft} size='2x' className="text-xl sm:text-3xl" /> :
                                                type === 'Var' ?
                                                    <img alt='' src={VAR} className="w-10 h-8 sm:w-12 sm:h-12" />
                                                    : null
                }
                </div>

                <div className="flex flex-col justify-center">
                    <span className="border-none text-sm sm:text-lg">{type === "subst" ? getTranslation("In",lang) +" " + assist : assist}</span>
                    <span className="border-none text-xs sm:text-sm">{type === "subst" ? getTranslation("Out",lang) + " " + player : player}</span>                    
                    {(type === "Var" || (type === "Goal" && detail === "Missed penalty")) ? <span className="border-none text-xs sm:text-sm">{getTranslation(detail,lang)}</span> : null}
                    {comments ? <span className="border-none text-xs sm:text-sm">{getTranslation(comments, lang)}</span> : null}
                </div>
            </div>)
    }

    let i = 0;
    return (
        <div className='block mx-auto my-2 w-full sm:w-[80%] lg:w-[60%] h-full bg-slate-50 rounded-xl p-2' >
            <p className="text-sm md:text-md">Penalty icon is created by <a className="underline" href="https://www.flaticon.com/free-icons/soccer" title="soccer icons">Freepik - Flaticon</a></p>
            <p className="text-sm md:text-md">Var icon is created by <a className="underline" href="https://www.flaticon.com/free-icons/football-referee" title="football referee icons">created by kosonicon - Flaticon</a></p>
            {
                isLoaded ?
                    events?.map((elem, index) => {
                        return (
                            <div className={`flex space-x-3 ${elem.team.id === teams.home.id ? "justify-start" : "flex-row-reverse"} my-4 `} key={index}>
                                <span className="border-none text-sm md:text-lg">`{elem.time.elapsed}</span>
                                <div>
                                    {
                                        events_div(elem.team.id, elem.player.name, elem.assist.name, elem.type, elem.detail, i++, elem.comments)
                                    }
                                </div>
                            </div>
                        )
                    })
                    :
                    <Spinner />
            }
        </div>
    )
}


export default memo(Events)