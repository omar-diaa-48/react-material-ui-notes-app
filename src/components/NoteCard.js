import { Card, CardContent, CardHeader, IconButton, Typography, makeStyles, Avatar } from "@material-ui/core"
import { blue, green, pink, yellow } from "@material-ui/core/colors"
import { DeleteOutlined } from "@material-ui/icons"
import React from "react"

const useStyles = makeStyles(() => {
    return {
        avatar:{
            backgroundColor: (note) => {
                const {category} = note;

                switch (category) {
                    case 'work':
                        return yellow[700]
                    case 'money':
                        return green[500]
                    case 'todos':
                        return pink[500]
                    default:
                        return blue[500]
                }
            }
        }
    }
})

export default function NoteCard({ note, handleDelete }){

    const classes = useStyles(note);

    return (
        <div>
            <Card elevation={3}>
                <CardHeader 
                    avatar={
                        <Avatar className={classes.avatar} >
                            {note.category[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={() => handleDelete(note.id)} >
                            <DeleteOutlined />
                        </IconButton>
                    }
                    title={note.title}
                    subheader={note.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" >
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}