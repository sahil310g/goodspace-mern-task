import React, { useState } from "react";

import { Button, Input } from "@mui/base";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div className="rectangle-parent">
        <div className="frame-child" />
        <b className="signup-login">Signup / Login</b>
        <div className="frame-parent">
          <div className="frame-group">
            <div className="your-email-id-wrapper">
              <div className="your-email-id">Your Email id</div>
            </div>
            <Input
              className="frame-item"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="frame-group">
            <div className="your-email-id-wrapper">
              <div className="your-email-id">Password</div>
            </div>
            <Input
              className="frame-item"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="button">
          <div className="button-child" />
          <div className="lets-go">
            <Button>
              <Link
                to={"/speechToText"}
                style={{ color: "inherit", "text-decoration": "none" }}
              >
                Lets Go!!
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
