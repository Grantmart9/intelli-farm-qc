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
import { AppName } from "./AppName";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
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

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1 justify-center flex gap-2 pb-4">
        <div className="inline-flex mt-4">
          <div className="bg-gray-200 rounded shadow-md p-4 ">
            <div className="font-bold flex justify-center mb-2">User: 1</div>
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
      </div>
    </div>
  );
};
