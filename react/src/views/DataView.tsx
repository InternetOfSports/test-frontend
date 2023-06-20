import { MsgRegisterParticipant } from "InternetOfSports-blockchain-client-ts/internetofsports.blockchain.identity/module";
import { useClient } from "../hooks/useClient";
import { IgntButton } from "@ignt/react-library";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useAddressContext } from "../def-hooks/addressContext";
import Teams from "../components/identity/teams";
import CreateTeam from "../components/identity/CreateTeam";


export default function DataView() {
  const client = useClient();
  const [nickname, setNickname] = useState('');
  const [teams, setTeams] = useState<any>(null);
  const [registerShowen, setRegisterShowen] = useState(true);
  let address = useAddressContext()

  useEffect(() => {
    async function fetchData() {
      if (client.signer) {
        try {
          let account = (await client.signer.getAccounts())[0];
          let queryParticipantResponse = await client.InternetofsportsBlockchainIdentity.query.queryParticipant(account.address);
          
          if (queryParticipantResponse.data.participant) {
            if (queryParticipantResponse.data.participant.nickname) {
              setNickname(queryParticipantResponse.data.participant.nickname);
            }
            if (queryParticipantResponse.data.participant.myTeams) {
              setTeams(queryParticipantResponse.data.participant.myTeams)
            }
            setRegisterShowen(false)
          }

        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      } else {
        setNickname("");
        setRegisterShowen(true)
      }
    }
    fetchData();
  }, [address]);
  
  async function registerParticipant() {
    let msgRegisterParticipant: MsgRegisterParticipant
    msgRegisterParticipant = MsgRegisterParticipant.fromJSON({"nickname": nickname, "creator": "ios1s6fcacczw0azezlvwfa7mpd4usdpgnzffmydd9"})
    await client.InternetofsportsBlockchainIdentity.tx.sendMsgRegisterParticipant({value: msgRegisterParticipant})
  }

  const handleNicknameChange = (event: any) => {
    setNickname(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2">
        <div>
          <section className={"me"}>
            <header className="flex items-center justify-between">
              <h2 className="text-3xl text-black font-semibold p-0 m-0 mb-2.5 flex-1">Me</h2>
            </header>
            <input
              className={"mt-1 py-2 px-4 h-12 bg-gray-100 border-xs text-base leading-tight w-full rounded-xl outline-0"}
              placeholder="Nickname"
              value={nickname}
              disabled={!registerShowen}
              onChange={handleNicknameChange}
            ></input>
            {registerShowen ? (<IgntButton onClick={registerParticipant} disabled={nickname == ""} >Register</IgntButton>): (<div></div>)}
          </section>
          <section className={"teams"}>
            {teams != null ? (<Teams teams={teams} title="My Teams"></Teams>): (<div />)}
            <CreateTeam></CreateTeam>
          </section>
        </div>
      </div>
    </div>
  );
}
