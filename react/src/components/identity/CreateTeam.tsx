import { IgntButton } from "@ignt/react-library"
import { useState } from "react"
import { useClient } from "../../hooks/useClient"
import { MsgCreateTeam } from "InternetOfSports-blockchain-client-ts/internetofsports.blockchain.identity/module"

export default function CreateTeam() {

    const [teamName, setTeamName] = useState("")

    function handleTeamNameChange(event: any) {
        setTeamName(event.target.value)
    }

    async function createTeam() {
        const client = useClient()
        if(teamName !== "" && client.signer) {
            let response = await client.InternetofsportsBlockchainIdentity.tx.sendMsgCreateTeam(
                {
                    value: MsgCreateTeam.fromJSON({name: teamName, creator: ((await client.signer.getAccounts())[0]).address }) 
                }
            )
            console.log(response)
        }   
    }

    return (
        <section className={"teams"}>
            <header className="flex items-center justify-between">
                <h3 className="text-3xl text-black font-semibold p-0 m-0 mb-2.5 flex-1">Create Team</h3>
            </header>
            <input
              className={"mt-1 py-2 px-4 h-12 bg-gray-100 border-xs text-base leading-tight w-full rounded-xl outline-0"}
              placeholder="Team name"
              value={teamName}
              onChange={handleTeamNameChange}
            ></input>
            <IgntButton
                onClick={createTeam}
            >Create Team</IgntButton>
        </section>
    )

}