import Navbar from "./components/Navbar/Navbar";
import ProjectContainer from "./components/ProjectContainer/ProjectContainer";
import Footer from "./components/Footer/Footer";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GameOfLife from "./components/GameOfLife/GameOfLife";
import ShoppingList from "./components/ShoppingList/ShoppingList";

const App: React.FC = () => {
    return (
        <Router>
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <Navbar />

                <Switch>
                    <Route exact path="/">
                        <ProjectContainer />
                    </Route>
                    <Route path="/shopping">
                        <ShoppingList />
                    </Route>
                    <Route path="/gameoflife">
                        <GameOfLife />
                    </Route>
                </Switch>

                <Footer />
            </Box>
        </Router>
    );
};

export default App;
