import "./passwordentry.scss";
import { Stack, TextField, Typography, Box, Button } from "@mui/material";
import { useState } from 'react';

// Please feel free to edit these lol
const helloMessages = [
  {
    header: "Hi, there!",
    sub: "I'm not sure we know each other."
  },
  {
    header: "I'm not sure I recognize you.",
    sub: "Let's get you set up with an account!"
  },
  {
    header: "Welcome to the Citrus family!",
    sub: "Let's get you set up with an account."
  },
  {
    header: "Thank's for choosing Citrus!",
    sub: "You're gonna love it."
  },
  {
    header: "Hello? Is there anybody in there?",
    sub: "Just nod if you can hear me."
  },
  {
    header: "All my live I've been waiting for someone like you.",
    sub: "Come on in!"
  },
  {
    header: "And well I, I won't go down by myself",
    sub: "But I'll go down with my friends, yeah!"
  }
]
const helloMsg = helloMessages[Math.floor(Math.random()*helloMessages.length)]

export default function PasswordEntry({ setPage, user, phoneNumber, phoneString }) {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submitEnable, setSubmitEnable] = useState(false);
  const [passwordFailMessages, setPasswordFailMessages] = useState([]);

  function renderHelloMessage() {
    return (
      <div>
        <Typography variant="h5" component="div" align="center" paddingTop="20px" sx={{ flexGrow: 1 }}>
          {helloMsg.header}
        </Typography>
        <Typography variant="subtitle2" component="div" align="center" paddingTop="5px" sx={{ flexGrow: 1, color: "gray" }}>
          {helloMsg.sub}
        </Typography>
      </div>
    )
  }

  function passwordValid() {
    const failMsg = [];
    var passFail = false;
    if (password.length <= 5 || password.length >= 33) {
      failMsg.push("Password must be between 6 and 32 charactes long.");
      passFail = true;
    }
    const number = /\d/;
    if (!number.test(password)) {
      failMsg.push("Password must contain at least one digit.");
      passFail = true;
    }
    const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!specialChar.test(password)) {
      failMsg.push("Password must contain at least one special character.");
      passFail = true;
    }
    if (passFail) {
      setPasswordFailMessages(failMsg);
      return false;
    }
    if (password !== passwordConfirm) {
      setPasswordFailMessages(["Passwords do not match."])
      return false;
    }
    setPasswordFailMessages([])
    return true;
  }

  function enableSubmit() {
    if ((firstName.length > 0) && (lastName.length > 0) && (password.length > 0) && (passwordConfirm.length > 0) && passwordValid()) {
      setSubmitEnable(true)
    } else {
      setSubmitEnable(false)
    }
  }

  function generateFailMessages() {
    return passwordFailMessages.map(msg => {
      return <Typography variant="subtitle2" sx={{color: "red" }} disabled={submitEnable}>{msg}</Typography>
    })
  }

  function makeExistingUserForm() {
    return (
      <Stack
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      alignItems="center"
      display="flex"
      justifyContent="center"
      >
        <Typography variant="h5" component="div" align="center" paddingTop="20px" sx={{ flexGrow: 1 }}>
            Welcome back to Citrus, {user.firstName}!
        </Typography>
        <TextField
          required
          id="password"
          label="Password"
        />
        <div className="login-next-button-container">
          <Stack direction="column">
            <Button variant="contained" component="div" onClick={() => handleSubmitExistingUser()}>Submit</Button>
          </Stack>
        </div>
      </Stack>
    )
  }

  function handleSubmitExistingUser() {
  }

  function handleSubmitNewUser() {
    console.log(firstName)
  }

  function makeNewUserForm() {
    return (
      <Stack
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      alignItems="center"
      display="flex"
      justifyContent="center"
      >
        { renderHelloMessage() }
        <Box>
          <TextField
            autoFocus
            required
            id="first-name"
            label="First Name"
            onChange={e => setFirstName(e.target.value)}
            onKeyUp={enableSubmit}
            onBlur={enableSubmit}
          />
          <TextField
            required
            id="last-name"
            label="Last Name"
            onChange={e => setLastName(e.target.value)}
            onKeyUp={enableSubmit}
            onBlur={enableSubmit}
          />
        </Box>
        <Box>
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            onKeyUp={enableSubmit}
            onBlur={enableSubmit}
          />
          <TextField
            required
            id="password-confirm"
            label="Confirm Password"
            type="password"
            onChange={e => setPasswordConfirm(e.target.value)}
            onKeyUp={enableSubmit}
            onBlur={enableSubmit}
          />
        </Box>
        { generateFailMessages() }
        <div className="login-next-button-container">
          <Stack direction="column">
            <Button variant="contained" component="div" onClick={() => handleSubmitNewUser()} disabled={!submitEnable}>Submit</Button>
          </Stack>
        </div>
      </Stack>
    )
  }

  return (
    user ? makeExistingUserForm() : makeNewUserForm()
  );
}