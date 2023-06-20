interface TeamsProps {
    teams?: Record<string, string>;
    title?: string
}

export default function Teams(props: TeamsProps) {
    let teamsList = [];
    if (props.teams) {        
        for (const key of Object.keys(props.teams)) {
            teamsList.push( <div key={key}>{key}</div> )
        }
    }
    
    return (<>
        <h3 className="text-3xl text-black font-semibold p-0 m-0 mb-2.5 flex-1">{props.title}</h3>
        <div>
            {teamsList}
        </div>
    </>)

}