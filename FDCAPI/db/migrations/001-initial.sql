--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE SECA_Auth (
    cmdr            TEXT    NOT NULL,
    state           TEXT    NOT NULL,
    code_verifier   TEXT    NOT NULL,
    code_challenge  TEXT    NOT NULL,
    auth_code       TEXT    NULL,
    token_type      TEXT    NULL,
    access_token    TEXT    NULL,
    refresh_token   TEXT    NULL,
    expires         TEXT    NULL
)

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE SECA_Auth;
