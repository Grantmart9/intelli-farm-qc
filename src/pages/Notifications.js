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
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Notifications = () => {
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
  const handleChange5 = (event) => {
    setUser5(event.target.value);
  };

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:p-1 md:p-1 p-1 justify-center flex gap-2 pb-4">
        <div className="xl:grid grid-cols-4 rounded gap-4 ml-12">
          <div className="inline-flex mt-4">
            <div className="bg-gray-200 rounded shadow-md p-4 ">
              <div className="font-bold flex justify-center mb-2">User: 1</div>
              <div className="block">
                <div className="mb-2 flex justify-center">
                  <TextField label="User email" variant="outlined" />
                </div>
                <div className="mb-2 block">
                  <TextField label="Contact Number" variant="outlined" />
                </div>
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
                <Button>Save</Button>
              </div>
            </div>
          </div>
          <div className="inline-flex mt-4">
            <div className="bg-gray-200 rounded shadow-md p-4 ">
              <div className="font-bold flex justify-center mb-2">User: 2</div>
              <div className="mb-2 flex justify-center">
                <TextField label="User email" variant="outlined" />
              </div>
              <div className="mb-2 block">
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
                <Button>Save</Button>
              </div>
            </div>
          </div>
          <div className="inline-flex mt-4">
            <div className="bg-gray-200 rounded shadow-md p-4 ">
              <div className="font-bold flex justify-center mb-2">User: 3</div>
              <div className="mb-2 flex justify-center">
                <TextField label="User email" variant="outlined" />
              </div>
              <div className="mb-2 block">
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
                <Button>Save</Button>
              </div>
            </div>
          </div>
          <div className="inline-flex mt-4">
            <div className="bg-gray-200 rounded shadow-md p-4 ">
              <div className="font-bold flex justify-center mb-2">User: 4</div>
              <div className="mb-2 flex justify-center">
                <TextField label="User email" variant="outlined" />
              </div>
              <div className="mb-2 block">
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
                <Button>Save</Button>
              </div>
            </div>
          </div>
          <div className="inline-flex mt-4">
            <div className="bg-gray-200 rounded shadow-md p-4 ">
              <div className="font-bold flex justify-center mb-2">User: 5</div>
              <div className="mb-2 flex justify-center">
                <TextField label="User email" variant="outlined" />
              </div>
              <div className="mb-2 block">
                <TextField label="Contact Number" variant="outlined" />
              </div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Contact Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={User5}
                  onChange={handleChange5}
                >
                  <MenuItem value={10}>SMS</MenuItem>
                  <MenuItem value={20}>Email</MenuItem>
                </Select>
              </FormControl>
              <div className="flex justify-center bg-blue-400 rounded">
                <Button>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};