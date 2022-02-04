// MARK: Imports
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LandingPage from "./LandingPage";
import Talon from "./Talon";
import TrumpCard from "./TrumpCard";
import PlayedCards from "./PlayedCards";
import YourCards from "./YourCards";
import Opening from "./Opening";
import LobbyPage from "./LobbyPage";
import PlayerList from "./PlayerList";
import GameInformation from "./GameInformation";
import Popup from "./Popup";

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
});

interface Props {}

interface CardProps {
    type: string;
    value: string;
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

    // Latest response from server (For debugging purposes)
    const [response, setResponse] = useState("");

    const [socket, setSocket] = useState(null);

    // The cards that can still be drawn from the talon
    const [talonCards, setTalonCards] = useState<CardProps[]>(
        new Array(0).fill({ type: "", value: "" })
    );

    // The trump card
    const [trumpCard, setTrumpCard] = useState<CardProps>({ type: "", value: "" });

    // The cards that are currently being played
    const [playedCards, setPlayedCards] = useState<CardProps[]>([]);

    // The cards that the user currently has
    const [yourCards, setYourCards] = useState<CardProps[]>(
        new Array(5).fill({ type: "", value: "" })
    );

    const [warningType, setWarningType] = useState("");
    const [infoType, setInfoType] = useState("");

    const resetWarning = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setWarningType("");
    };

    const resetInfo = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setInfoType("");
    };

    const login = (username: string, lobbycode: string) => {
        setLoggedIn(true);
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
        // The array of played cards is filled up with empty entries in PlayingField.tsx in order to make empty GaigelCards
        // For some reason those also append to playedCards
        // Therefore they need to be filtered out
        let actualPlayedCards: CardProps[] = playedCards.filter(
            (card) => card.type !== "" && card.value !== ""
        );

        // if (actualPlayedCards.length < playerCount) {
        let playedCardIndex: number = yourCards.findIndex((card) => {
            return card.type === type && card.value === value;
        });
        setYourCards(yourCards.filter((card, index) => index !== playedCardIndex));

        setPlayedCards(() => [...actualPlayedCards, { type: type, value: value }]);

        let playedCard: CardProps = { type: type, value: value };
        // @ts-ignore
        socket.emit("playCard", playedCard);
    };

    const AndereAlteHat = () => {
        if (yourCards.filter((card) => card.value === "A").length > 0) {
            // @ts-ignore
            socket.emit("AndereAlteHat", "");
        } else {
            setWarningType("noAce");
        }
    };

    const GeElfen = () => {
        if (yourCards.filter((card) => card.value === "A").length > 0) {
            // @ts-ignore
            socket.emit("GeElfen", "");
        } else {
            setWarningType("noAce");
        }
    };

    const HöherHat = () => {
        // @ts-ignore
        socket.emit("HöherHat", "");
    };

    const AufDissle = () => {
        // @ts-ignore
        socket.emit("AufDissle", "");
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

        newSocket.on("startGame", (data: any) => {
            setGameStarted(true);
        });

        newSocket.on("setTalon", (data: any) => {
            console.log("Talon set");
            setTalonCards(data);
        });

        newSocket.on("setTrumpCard", (data: any) => {
            console.log("Trumpcard set");
            setTrumpCard(data);
        });

        newSocket.on("setYourCards", (data: any) => {
            console.log("Your cards set");
            setYourCards(data);
        });

        newSocket.on("setPlayedCards", (data: any) => {
            console.log("Played cards set");
            setPlayedCards(data);
            console.log(playedCards);
        });

        newSocket.on("openOpening", (data: any) => {
            console.log("Open Opening");
            setOpening(true);
        });

        newSocket.on("closeOpening", (data: any) => {
            console.log("Closed Opening");
            setOpening(false);
        });

        newSocket.on("template", (data: string) => {
            // DO NOT use states (in most cases)
            // DO use "data"
        });

        return () => newSocket.close();
    }, [setSocket]);

    // MARK: Return
    // <Typography>|{response}|</Typography>
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
                        />
                    </Box>

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

            <Popup snackbarType="info" type={infoType} reset={resetInfo} />
            <Popup snackbarType="warning" type={warningType} reset={resetWarning} />
        </Box>
    );
};

export default Gaigel;
