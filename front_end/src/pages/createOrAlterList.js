import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import Popover from '@mui/material/Popover';

export default function CreateORALterList(props) {

  const list = props.list;
  const isCreate = props.isCreate;

  const [listId, setListId] = useState('');
  const [listName, setListName] = useState('');
  const [listNameErr, setListNameErr] = useState(false);
  const [description, setDescription] = useState('');
  const [trackList, setTrackList] = useState('');
  const [trackListErr, setTrackListErr] = useState(false);
  const [visibility, setVisibility] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (list) {
      setListName(list.list_name);
      setDescription(list.description);
      setTrackList(list.list_of_tracks);
      setListId(list.list_id);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleSubmit = e => {
    e.preventDefault();
    let err = false;
    if (!listName) {
      setListNameErr(true);
      err = true;
    }
    if (!trackList) {
      setTrackListErr(true);
      err = true;
    }
    if (err) {
      return;
    }
    if (isCreate) {
      AuthService.createList(listName, description, trackList, visibility);
      window.location.reload();
    }
    else {
      AuthService.alterList(listId, listName, description, trackList, visibility);
      window.location.reload();
    }
  };

  return (
    // <Container component="main" maxWidth="md">
      <Box align='right'>
        {isCreate ?
          <Button variant="contained" onClick={handleClick}>
            Create List
          </Button>
          :
          <Button
            variant="contained"
            color="success"
            size='small'
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            Edit
          </Button>
        }

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box component="form" sx={{ mt: 3, ml: 2, mr: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="List Name"
                  value={listName}
                  onChange={e => { setListName(e.target.value) }}
                  helperText={listNameErr ? 'empty!' : ''}
                  error={listNameErr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  rows='5'
                  multiline='true'
                  value={description}
                  onChange={e => { setDescription(e.target.value) }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="List Of Tracks (divided by comma)"
                  value={trackList}
                  onChange={e => { setTrackList(e.target.value) }}
                  helperText={trackListErr ? 'empty!' : ''}
                  error={trackListErr}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={1.5}>
                <Select
                  value={visibility}
                  onChange={e => { setVisibility(e.target.value) }}
                >
                  <MenuItem value={0}>Private</MenuItem>
                  <MenuItem value={1}>Public</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </Box>
        </Popover>
      </Box>
    // </Container >
  );
};