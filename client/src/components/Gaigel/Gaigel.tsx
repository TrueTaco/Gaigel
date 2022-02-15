// MARK: Imports
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";

import LandingPage from "./LandingPage";
import Talon from "./Talon";
import TrumpCard from "./TrumpCard";
import PlayedCards from "./PlayedCards";
import YourCards from "./YourCards";
import { Box, Button } from "@material-ui/core";
import Opening from "./Opening";
import LobbyPage from "./LobbyPage";
import PlayerList from "./PlayerList";
import GameInformation from "./GameInformation";
import Popup from "./Popup";
import EndPopup from "./EndPopup";

// MARK: Styles
const useStyles = makeStyles({
    root: {
        // color: "white",
        height: "100vh",
        paddingLeft: 20,
        paddingRight: 20,
        // boxShadow: "0 0 0 5px #53362b",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignContent: "space-around",
        alignItems: "center",
    },
    playingField: {
        padding: 10,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: "#1E7307",
        border: "5px solid #185905",
        // boxShadow: "0 0 0 5px #185905",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    talonAndTrump: {
        display: "flex",
        justifyContent: "center",
    },
    meldenButton: {
        backgroundColor: "#575757",
        border: "5px solid #303030",
        borderRadius: 20,
        display: "flex",
        color: "white",
        "&:hover": {
            backgroundColor: "#474747",
        },
    },
});

interface Props {}

interface CardProps {
    type: string;
    value: string;
}

interface warningInfoProps {
    type: string;
    detail: string;
}

const Gaigel: React.FC<Props> = () => {
    // MARK: States
    const classes = useStyles();

    // Boolean for deciding on whether to show the landing page or the lobby
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    // Boolean for deciding on whether to show the lobby page or the game
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    const [ownUsername, setOwnUsername] = useState<string>("");

    const [score, setScore] = useState<number>(0);

    // All needed information about the joined lobby
    const [lobbyInformation, setLobbyInformation] = useState<any>({
        lobbycode: "",
        amountReadyPlayers: 0,
        playerInformation: [],
    });

    const [order, setOrder] = useState<string[]>([]);
    const [playerWithTurn, setPlayerWithTurn] = useState<string>("");

    const [opening, setOpening] = useState<boolean>(false);

    const [currentOpening, setCurrentOpening] = useState<string>("");

    // Latest response from server (For debugging purposes)
    const [response, setResponse] = useState("");

    const [socket, setSocket] = useState(null);

    const [announcing, setAnnouncing] = useState<boolean>(false);

    // The cards that can still be drawn from the talon
    const [talonCards, setTalonCards] = useState<CardProps[]>(
        new Array(0).fill({ type: "", value: "" })
    );

    // The trump card
    const [trumpCard, setTrumpCard] = useState<CardProps>({ type: "", value: "" });

    // The cards that are currently being played
    const [playedCards, setPlayedCards] = useState<CardProps[]>([]);

    // Determines if the player can call (melden)
    const [canCall, setCanCall] = useState<boolean>(true);

    // The cards that the user currently has
    const [yourCards, setYourCards] = useState<CardProps[]>(
        new Array(5).fill({ type: "", value: "" })
    );

    const [warningType, setWarningType] = useState<warningInfoProps>({ type: "", detail: "" });
    const [infoType, setInfoType] = useState<warningInfoProps>({ type: "", detail: "" });

    const resetWarning = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setWarningType({ type: "", detail: "" });
    };

    const resetInfo = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setInfoType({ type: "", detail: "" });
    };

    const login = (username: string, lobbycode: string) => {
        setOwnUsername(username);

        // @ts-ignore
        socket.emit("joinLobby", { username: username, lobbycode: lobbycode });
    };

    const backToLogin = () => {
        setLoggedIn(false);
        setGameStarted(false);

        // @ts-ignore
        socket.emit("backToLogin", "");
    };

    const getReady = () => {
        // @ts-ignore
        socket.emit("getReady", "");
    };

    const drawCard = () => {
        console.log("Want to draw card");
    };

    // MARK: playCard
    const playCard = (type: string, value: string) => {
        if (opening) {
            setWarningType({ type: "noOpeningChosen", detail: "" });
            return;
        }

        if (yourCards.length < 5 && talonCards.length > 0) {
            setWarningType({ type: "waitForCards", detail: "" });
            return;
        }

        let playedCard: CardProps = { type: type, value: value };
        // @ts-ignore
        socket.emit("playCard", playedCard);
    };

    const AndereAlteHat = () => {
        if (yourCards.filter((card) => card.value === "A").length > 0) {
            // @ts-ignore
            socket.emit("chooseOpening", "AndereAlteHat");
        } else {
            setWarningType({ type: "noAce", detail: "" });
        }
    };

    const GeElfen = () => {
        if (yourCards.filter((card) => card.value === "A").length > 0) {
            // @ts-ignore
            socket.emit("chooseOpening", "GeElfen");
        } else {
            setWarningType({ type: "noAce", detail: "" });
        }
    };

    const HöherHat = () => {
        let allowedCards = yourCards.filter(
            (card) => trumpCard.type !== card.type && card.value !== "A"
        );

        if (allowedCards.length < 1) {
            setWarningType({ type: "höherHatNotPossible", detail: "" });
        } else {
            // @ts-ignore
            socket.emit("chooseOpening", "HöherHat");
        }
    };

    const AufDissle = () => {
        // @ts-ignore
        socket.emit("chooseOpening", "AufDissle");
    };

    const Melden = () => {
        if (ownUsername === playerWithTurn) {
            // @ts-ignore
            socket.emit("Melden", !announcing);
            setAnnouncing(!announcing);
        } else {
            setWarningType({ type: "meldenNotCurrentlyPlaying", detail: "" });
        }
    };

    // MARK: useEffect
    useEffect(() => {
        console.log("UseEffect 1 was called");
        // @ts-ignore
        setSocket(socket);
    }, []);

    // @ts-ignore
    useEffect(() => {
        const newSocket = socketIOClient("http://127.0.0.1:5000");
        // @ts-ignore
        setSocket(newSocket);

        newSocket.on("onConnect", (data: string) => {
            setResponse(data);
        });

        newSocket.on("setLoggedIn", (data: boolean) => {
            setLoggedIn(data);
        });

        newSocket.on("lobbyInformation", (data: any) => {
            setLobbyInformation(data);
        });

        newSocket.on("setOrder", (data: any) => {
            setOrder(data);
        });

        newSocket.on("setPlayerWithTurn", (data: any) => {
            setPlayerWithTurn(data);
        });

        newSocket.on("setInfoType", (data: any) => {
            setInfoType(data);
        });

        newSocket.on("setWarningType", (data: any) => {
            setWarningType(data);
        });

        newSocket.on("setScore", (data: any) => {
            setScore(data);
        });

        newSocket.on("setGameStarted", (data: boolean) => {
            setGameStarted(data);
            console.log("Game state: " + data);
        });

        newSocket.on("setTalon", (data: any) => {
            setTalonCards(data);
        });

        newSocket.on("setTrumpCard", (data: any) => {
            setTrumpCard(data);
        });

        newSocket.on("setYourCards", (data: any) => {
            setYourCards(data);
        });

        newSocket.on("setPlayedCards", (data: any) => {
            setPlayedCards(data);
        });

        newSocket.on("openOpening", (data: any) => {
            setOpening(true);
        });

        newSocket.on("closeOpening", (data: any) => {
            setOpening(false);
        });

        newSocket.on("setOpening", (data: any) => {
            setCurrentOpening(data);
        });

        newSocket.on("canCall", (data: any) => {
            setCanCall(data);
        });

        newSocket.on("template", (data: string) => {
            // DO NOT use states (in most cases)
            // DO use "data"
        });

        return () => newSocket.close();
    }, [setSocket]);

    // MARK: Return
    // @ts-ignore
    return (
        <Box
            className={classes.root}
            style={{
                backgroundColor: !loggedIn || !gameStarted ? "#313131" : "#7c5439",
                border: !loggedIn || !gameStarted ? "none" : "10px solid #53362b",
            }}
        >
            {!loggedIn ? (
                <LandingPage login={login} />
            ) : !gameStarted ? (
                <LobbyPage
                    backToLogin={backToLogin}
                    lobbycode={lobbyInformation.lobbycode}
                    playerInformation={lobbyInformation.playerInformation}
                    amountReadyPlayers={lobbyInformation.amountReadyPlayers}
                    getReady={getReady}
                />
            ) : (
                <>
                    <GameInformation
                        username={ownUsername}
                        lobbycode={lobbyInformation.lobbycode}
                        score={score}
                    />
                    <PlayerList order={order} playerWithTurn={playerWithTurn} />
                    <Box className={classes.playingField}>
                        <Box className={classes.talonAndTrump}>
                            <Talon cardsLeft={talonCards.length} drawCard={drawCard} />
                            <TrumpCard trumpCard={trumpCard} />
                        </Box>

                        <PlayedCards
                            playedCards={playedCards}
                            playerCount={lobbyInformation.playerInformation.length}
                            opening={currentOpening}
                        />
                    </Box>

                    <EndPopup />

                    {canCall && (
                        <Button
                            variant="outlined"
                            //sx={{ boxShadow: 1 }}
                            className={classes.meldenButton}
                            style={{
                                border:
                                    announcing === false
                                        ? "5px solid #303030"
                                        : " 5px solid #ffe600",
                            }}
                            onClick={Melden}
                        >
                            Melden
                        </Button>
                    )}
                    {opening && (
                        <Opening
                            AndereAlteHat={AndereAlteHat}
                            GeElfen={GeElfen}
                            HöherHat={HöherHat}
                            AufDissle={AufDissle}
                        ></Opening>
                    )}
                    <YourCards userCards={yourCards} playCard={playCard} />
                </>
            )}

            <Popup
                snackbarType="info"
                type={infoType.type}
                detail={infoType.detail}
                reset={resetInfo}
            />
            <Popup
                snackbarType="warning"
                type={warningType.type}
                detail={warningType.detail}
                reset={resetWarning}
            />
        </Box>
    );
};

export default Gaigel;
