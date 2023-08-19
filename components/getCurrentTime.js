import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

export default getCurrentTime=(time)=>{
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const inSeconds = new Date(time).getTime();
    const curtime = timeAgo.format(inSeconds - 60 * 1000);

    return curtime;
}
