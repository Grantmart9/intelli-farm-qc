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
import { DatePicker, LocalizationProvider } from "@material-ui/pickers";
import MomentUtils from "@material-ui/pickers/adapter/moment";
import moment from "moment";

import TextField from "@material-ui/core/TextField";

const dateFormat = "YYYY-MM-DD";
const DatePickers = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={MomentUtils} dateFormat={dateFormat}>
      <DatePicker
        renderInput={(props) => (
          <TextField
            {...props}
            variant="outlined"
            margin="none"
            helperText=""
          ></TextField>
        )}
        inputFormat={dateFormat}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

const EmailInput = ({ value, onInput }) => {
  return (
    <TextField
      className="w-full"
      label="Email Address"
      variant="outlined"
      value={value}
      onInput={onInput}
    />
  );
};

const SaveButton = () => {
  return (
    <button
      type="submit"
      style={{
        backgroundColor: "steelblue",
        border: "1px 1px solid steelblue",
        borderRadius: "0.2cm",
        color: "white",
        width: "5rem",
        height: "2rem"
      }}
    >
      Send
    </button>
  );
};

export const Report = () => {
  const { farmId } = useParams();
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [{ data, loading, error }, postReport] = useApi(
    {
      url: `${API_URL}/-${farmId}/report`,
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    },
    {
      manual: true
    }
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      postReport({
        data: {
          start_date: moment(date).format(dateFormat),
          email: email
        }
      }).catch((e) => setMessage(e.toString()));
    },
    [date, email]
  );

  return (
    <div className="flex justify-content-center p-4">
      <form
        className="flex flex-col align-items-center bg-gray-400 shadow-md rounded p-5 space-y-5 block"
        onSubmit={handleSubmit}
      >
        <EmailInput value={email} onInput={(e) => setEmail(e.target.value)} />
        <DatePickers value={date} onChange={(date) => setDate(date)} />
        <div className="text-red-400 text-center">{message}</div>
        <div>{data}</div>
        <SaveButton />
      </form>
    </div>
  );
};
