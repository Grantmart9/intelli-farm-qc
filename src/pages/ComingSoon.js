/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 16/08/2021 - 08:24:31
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 16/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export const ComingSoon = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [User2, setUser2] = React.useState("");
  const [User3, setUser3] = React.useState("");
  const [User4, setUser4] = React.useState("");
  const [User5, setUser5] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChange2 = (event) => {
    setUser2(event.target.value);
  };
  const handleChange3 = (event) => {
    setUser3(event.target.value);
  };
  const handleChange4 = (event) => {
    setUser4(event.target.value);
  };

  return (
    <div className="flex align-center justify-center">
        <div className="xl:grid grid-cols-4 gap-4 rounded p-4">
          <div className="flex mt-2">
            <div className="bg-gray-200 rounded shadow-md p-4">
              <div className="font-bold flex justify-center mb-2">User: 1</div>
              <div className="grid grid-row-2 gap-2">
                  <TextField label="User email" variant="outlined" />
                  <TextField label="Contact Number" variant="outlined" />
              </div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Contact Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>SMS</MenuItem>
                  <MenuItem value={20}>Email</MenuItem>
                </Select>
              </FormControl>
              <div className="flex justify-center bg-blue-400 rounded">
              <Button><div style={{color:"white"}}>Save</div></Button>
              </div>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="bg-gray-200 rounded shadow-md p-4 ">
              <div className="font-bold flex justify-center mb-2">User: 2</div>
              <div className="grid grid-row-2 gap-2">
                  <TextField label="User email" variant="outlined" />
                  <TextField label="Contact Number" variant="outlined" />
              </div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Contact Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={User2}
                  onChange={handleChange2}
                >
                  <MenuItem value={10}>SMS</MenuItem>
                  <MenuItem value={20}>Email</MenuItem>
                </Select>
              </FormControl>
              <div className="flex justify-center bg-blue-400 rounded">
              <Button><div style={{color:"white"}}>Save</div></Button>
              </div>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="bg-gray-200 rounded shadow-md p-4 ">
              <div className="font-bold flex justify-center mb-2">User: 3</div>
              <div className="grid grid-row-2 gap-2">
                  <TextField label="User email" variant="outlined" />
                  <TextField label="Contact Number" variant="outlined" />
              </div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Contact Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={User3}
                  onChange={handleChange3}
                >
                  <MenuItem value={10}>SMS</MenuItem>
                  <MenuItem value={20}>Email</MenuItem>
                </Select>
              </FormControl>
              <div className="flex justify-center bg-blue-400 rounded">
              <Button><div style={{color:"white"}}>Save</div></Button>
              </div>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="bg-gray-200 rounded shadow-md p-4 ">
              <div className="font-bold flex justify-center mb-2">User: 4</div>
              <div className="grid grid-row-2 gap-2">
                  <TextField label="User email" variant="outlined" />
                  <TextField label="Contact Number" variant="outlined" />
              </div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Contact Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={User4}
                  onChange={handleChange4}
                >
                  <MenuItem value={10}>SMS</MenuItem>
                  <MenuItem value={20}>Email</MenuItem>
                </Select>
              </FormControl>
              <div className="flex justify-center bg-blue-400 rounded">
              <Button><div style={{color:"white"}}>Save</div></Button>
              </div>
            </div>
          </div>
        </div>
        </div>
  );
};
