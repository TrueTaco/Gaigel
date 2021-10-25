import { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ShoppingItem from "../../components/ShoppingItem/ShoppingItem";
import AddShoppingItem from "../../components/AddShoppingItem/AddShoppingItem";
import ShoppingCode from "../../components/ShoppingCode/ShoppingCode";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {},
    second: {
        maxWidth: 700,
        width: "90%",
        marginTop: 10,
        marginBottom: 20,
    },
    location: {
        marginTop: 10,
        marginRight: "auto",
        marginLeft: 10,
        color: "white",
        fontWeight: 200,
    },
});

interface Props {}

interface Item {
    id: string;
    name: string;
    location: string;
    completed: string;
}

const ShoppingList: React.FC<Props> = () => {
    const [shoppingList, setShoppingList] = useState<Array<Item>>([]);
    const [code, setCode] = useState<string>("");
    const classes = useStyles();
    const database: string = "https://obrm.de/api/index.php";
    const pass: string = "BkhMXFtCb0jo9sajGp7t0Nxb9FXD";
    const headers = {
        "Content-Type": "form-data",
    };
    const locations: string[] = ["Rewe", "Edeka", "Real", "Lidl", "Aldi", "DM", "Bioladen", "Genussfaktur", "Sonstiges"];

    const fetchItems = async (pCode: string) => {
        const data = new FormData();
        data.append("pass", pass);
        data.append("query", `SELECT * FROM new_shopping WHERE listcode = "${pCode}"`);

        await axios
            .post(database, data, {
                headers: headers,
            })
            .then(function (response) {
                // console.log(response.data);
                setShoppingList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setTimeout(() => {
                    fetchItems(pCode);
                }, 5000);
            });
    };

    const toggleComplete = async (name: string, location: string, completed: string, firstTry: boolean) => {
        const data = new FormData();
        const newCompleted = completed === "1" ? "0" : "1";
        data.append("pass", pass);
        data.append(
            "query",
            `UPDATE new_shopping SET completed = ${newCompleted} WHERE name = "${name}" AND location = "${location}" AND listcode = "${code}"`
        );

        if (firstTry) {
            setShoppingList(
                shoppingList.map((item) => {
                    return item.name === name && item.location === location
                        ? { id: item.id, name: item.name, location: item.location, completed: newCompleted }
                        : item;
                })
            );
        }

        await axios
            .post(database, data, {
                headers: headers,
            })
            .then(function (response) {
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                setTimeout(() => {
                    toggleComplete(name, location, completed, false);
                }, 1000);
            });
    };

    const deleteItem = async (name: string, location: string, firstTry: boolean) => {
        const data = new FormData();
        data.append("pass", pass);
        data.append(
            "query",
            `DELETE FROM new_shopping WHERE name = "${name}" AND location = "${location}" AND listcode = "${code}"`
        );

        if (firstTry) {
            setShoppingList(shoppingList.filter((item) => !(item.name === name && item.location === location)));
        }

        await axios
            .post(database, data, {
                headers: headers,
            })
            .then(function (response) {
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                setTimeout(() => {
                    deleteItem(name, location, false);
                }, 1000);
            });
    };

    const addItem = async (name: string, location: string, firstTry: boolean) => {
        const data = new FormData();
        data.append("pass", pass);
        data.append(
            "query",
            `INSERT INTO new_shopping (name, location, completed, listcode) VALUES ("${name}", "${location}", 0, "${code}")`
        );

        if (firstTry) {
            setShoppingList((shoppingList) => [
                ...shoppingList,
                { id: "UNKNOWN", name: `${name}`, location: `${location}`, completed: "0", listcode: `${code}` },
            ]);
        }

        await axios
            .post(database, data, {
                headers: headers,
            })
            .then(function (response) {
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                setTimeout(() => {
                    addItem(name, location, false);
                }, 1000);
            });
    };

    const changeName = async (name: string, location: string, newName: string, firstTry: boolean) => {
        const data = new FormData();
        data.append("pass", pass);
        data.append(
            "query",
            `UPDATE new_shopping SET name = "${newName}" WHERE name = "${name}" AND location = "${location}" AND listcode = "${code}"`
        );

        if (firstTry) {
            setShoppingList(
                shoppingList.map((item) => {
                    return item.name === name && item.location === location
                        ? { id: item.id, name: newName, location: item.location, completed: item.completed }
                        : item;
                })
            );
        }

        await axios
            .post(database, data, {
                headers: headers,
            })
            .then(function (response) {
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                setTimeout(() => {
                    changeName(name, location, newName, false);
                }, 1000);
            });
    };

    const handleCodeSubmit = (newCode: string) => {
        setCode(newCode);
        fetchItems(newCode);
    };

    const handleRefresh = () => {
        fetchItems(code);
    };

    return (
        <Grid className={classes.root} container justifyContent="center" direction="column" alignItems="center">
            <Grid className={classes.second} container justifyContent="center" direction="column" alignItems="center">
                {code ? (
                    <>
                        <AddShoppingItem locations={locations} addItem={addItem} handleRefresh={handleRefresh} />
                        <hr style={{ width: "100%", maxWidth: 690, height: 1, backgroundColor: "white", border: "none" }} />
                        {shoppingList &&
                            locations.map((location) =>
                                shoppingList
                                    .filter((item) => item.location === location)
                                    .map((item, index) => (
                                        <Grid
                                            className={classes.root}
                                            container
                                            justifyContent="center"
                                            direction="column"
                                            alignItems="center"
                                            key={index}
                                        >
                                            {index === 0 && (
                                                <Typography className={classes.location} variant="h4">
                                                    {location}
                                                </Typography>
                                            )}

                                            <ShoppingItem
                                                index={index}
                                                name={item.name}
                                                location={item.location}
                                                completed={item.completed}
                                                toggleComplete={toggleComplete}
                                                deleteItem={deleteItem}
                                                changeName={changeName}
                                            />
                                        </Grid>
                                    ))
                            )}
                    </>
                ) : (
                    <ShoppingCode handleCodeSubmit={handleCodeSubmit} />
                )}
            </Grid>
        </Grid>
    );
};

export default ShoppingList;
