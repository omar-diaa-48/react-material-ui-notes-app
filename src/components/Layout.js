import { Container, Drawer, makeStyles, Typography, List, ListItem, ListItemIcon, ListItemText, MenuItem } from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page:{
            background:'#f9f9f9',
            width:'100%',
            padding:theme.spacing(3)
        },
        drawer:{
            width:drawerWidth
        },
        drawerPaper:{
            width:drawerWidth
        },
        root:{
            display:'flex'
        },
        active:{
            background:'#f4f4f4'
        }
    }
})

const menuItems = [
    {id:1, text:'My Notes', icon:<SubjectOutlined color="secondary" />, path:'/'},
    {id:2, text:'Create Note', icon:<AddCircleOutlined color="secondary" />, path:'/create'}
]

export default function Layout ({children}) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    
    return (
        <div className={classes.root} >
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{
                    paper:classes.drawerPaper
                }}
            >
                <div>
                    <Typography variant="h5" >
                        Net Ninja Notes
                    </Typography>
                </div>

                <List>
                    {menuItems.map((menuItem) => {
                        const {id, text, icon, path} = menuItem;

                        return (
                            <ListItem 
                                key={id} 
                                onClick={() => history.push(path)}
                                style={{cursor:'pointer'}}
                                className={location.pathname === path ? classes.active : null}
                                >
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>

            <div className={classes.page} >
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    )
}