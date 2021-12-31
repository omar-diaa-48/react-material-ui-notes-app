import { Button, Container, Typography, makeStyles, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import React, { useState } from 'react'

const useStyles = makeStyles({
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }
});

export default function Create() {
  const classes = useStyles();

  const [form, setForm] = useState({
    title:'',
    details:''
  })

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;

    setForm({
      ...form,
      [field]:value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const {title, details} = form;
    if(title && details){
      console.log({title, details});
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a new note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          className={classes.field}
          color="secondary"
          label="Node title"
          variant="outlined"
          fullWidth
          required
          name="title"
        />

        <TextField
          onChange={handleChange}
          className={classes.field}
          color="secondary"
          label="Details"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
          name="details"
        />
        
        <Button
          type="submit"
          color="secondary"
          variant="outlined"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

    </Container>
  )
}
