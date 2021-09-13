/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 18/08/2021 - 08:45:18
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 18/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL, useApi } from "api";
import { DateTimePicker, LocalizationProvider } from "@material-ui/pickers";
import MomentUtils from "@material-ui/pickers/adapter/moment";
import moment from "moment";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
  },
}));

const DatePicker = ({ value, onChange }) => {
  const dateFormat = "YYYY-MM-DD";
  const handleChange = useCallback(
    (date) => {
      onChange(moment(date).format(dateFormat));
    },
    [onChange]
  );

  return (
    <div className="p-2 block md:flex md:align-center md:justify-center md:gap-2">
      <div className="bg-gray-400 rounded shadow-md p-2">
        <LocalizationProvider dateAdapter={MomentUtils} dateFormat={dateFormat}>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                {...props}
                variant="outlined"
                margin="none"
                helperText=""
              ></TextField>
            )}
            inputFormat={dateFormat}
            value={new Date(value)}
            onChange={handleChange}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

const EmailInput = ({ value, onInput }) => {
  return (
    <div className="flex align-center justify-center bg-gray-400 rounded shadow-md pd-2 mt-3">
      <TextField
        className="w-full"
        label="Email Address"
        variant="outlined"
        value={value}
        onInput={onInput}
      />
    </div>
  );
};

const SaveButton = () => {
  return (
    <div className="flex align-center justify-center mt-3">
      <button
        type="submit"
        style={{
          backgroundColor: "steelblue",
          border: "1px 1px solid steelblue",
          borderRadius: "0.2cm",
          color: "white",
          width: "5rem",
          height: "2rem",
        }}
      >
        Save
      </button>
    </div>
  );
};

export const Report = () => {
  const { farmId } = useParams();
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [{ loading, error }, postReport] = useApi(
    {
      url: `${API_URL}/-${farmId}/report`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    },
    {
      manual: true,
    }
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      postReport().catch((e) => setMessage(e));
    },
    [date, email]
  );

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:p-1 md:p-1 p-4">
        <div className="block">
          <form
            className="bg-gray-400 shadow-md rounded p-2 block"
            onSubmit={handleSubmit}
          >
            <div className="text-red-400">{message}</div>
            <DatePicker value={date} onChange={(date) => setDate(date)} />
            <EmailInput
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
            <SaveButton />
          </form>
        </div>
      </div>
    </div>
  );
};
