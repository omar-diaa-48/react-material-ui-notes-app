import { Button, Container, Typography, makeStyles, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import React, { useState } from 'react'
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();

  const [formValues, setFormValues] = useState({
    title:{
      value:'',
      error:false
    },
    details:{
      value:'',
      error:false
    },
    category:{
      value:'money',
      error:false
    }
  })

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;

    setFormValues({
      ...formValues,
      [field]:{
        ...formValues[field],
        value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const fieldKeys = Object.keys(formValues)
    const fieldValues = fieldKeys.map(field => formValues[field].value);
    if(fieldValues.some(fieldValue => fieldValue === '')){
      fieldKeys.forEach(fieldKey => {
        if(formValues[fieldKey]['value'] === ''){
          setFormValues({
            ...formValues,
            [fieldKey]:{
              ...formValues[fieldKey],
              error:true
            }
          })
        }
      })
    }else{
      const {title, details, category} = formValues
      fetch('http://localhost:8000/notes', {
        method:'POST',
        headers:{'Content-type':"application/json"},
        body:JSON.stringify({
          title:title.value,
          details:details.value,
          category:category.value
        })
      })
      .then(() => history.push('/'))
    }
  }

  return (
    <div>
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
          value={formValues.title.value}
          error={formValues.title.error}
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
          value={formValues.details.value}
          error={formValues.details.error}
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

        <FormControl className={classes.field} >
          <FormLabel>Note category</FormLabel>
          <RadioGroup name="category" value={formValues.category.value} onChange={handleChange} >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="outlined"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

    </div>
  )
}
