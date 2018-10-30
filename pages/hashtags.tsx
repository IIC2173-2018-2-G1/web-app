import React from "react"
import Layout from "../src/components/Layout"
import FormControl from "@material-ui/core/FormControl"
import Select from "react-select"
import Typography from "@material-ui/core/Typography"
import NoSsr from "@material-ui/core/NoSsr"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import List from "@material-ui/core/List"
import Message from "../src/components/Message"
import Button from "@material-ui/core/Button"
import Search from "@material-ui/icons/Search"
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles"

const styles = (theme: Theme) =>
  createStyles({
    form: {
      width: "auto",
      display: "block", // Fix IE11 issue.
      marginTop: theme.spacing.unit,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: "calc(100% - 70px)",
        marginLeft: "auto",
        marginRight: "auto",
      },
      background: theme.palette.background.paper,
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit,
      borderRadius: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
      display: "inline-block",
      float: "right",
      width: 10,
    },
    input: {
      display: "flex",
      padding: 0,
      "&:hover": {
        cursor: "pointer",
      },
      //color: theme.palette.grey,
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: "absolute",
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    messageList: {
      margin: "auto",
      padding: theme.spacing.unit * 2,
      display: "block",
      flexDirection: "column-reverse",
      overflow: "auto",
    },
    select: {
      // width: 600,
      display: "inline-block",
      float: "left",
    },
  })

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  )
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
}

const knownHashtags = [
  "hashtag1",
  "hashtag2",
  "hashtag3",
  "hashtag4",
  "hashtag5",
  "hashtag6",
  "hashtag7",
  "hashtag8",
  "hashtag9",
  "hashtag10",
  "hashtag11",
]

const messages = [
  { id: 1, content: "mensaje1", username: "dacasas" },
  { id: 2, content: "mensaje2", username: "dacasas" },
  { id: 3, content: "mensaje3", username: "dacasas" },
  { id: 4, content: "mensaje4", username: "dacasas" },
  { id: 5, content: "mensaje5", username: "dacasas" },
  { id: 6, content: "mensaje6", username: "dacasas" },
  { id: 7, content: "mensaje7", username: "dacasas" },
  { id: 8, content: "mensaje8", username: "dacasas" },
  { id: 9, content: "mensaje9", username: "dacasas" },
  { id: 10, content: "mensaje10", username: "dacasas" },
  { id: 11, content: "mensaje11", username: "dacasas" },
  { id: 12, content: "mensaje12", username: "dacasas" },
  { id: 13, content: "mensaje13", username: "dacasas" },
  { id: 14, content: "mensaje14", username: "dacasas" },
]

export interface HashtagsPageProps extends WithStyles<typeof styles> {}

export interface HashtagsPageState {
  hashtag: { label: string; value: string }
}

class HashtagsPage extends React.Component<
  HashtagsPageProps,
  HashtagsPageState
> {
  state = {
    hashtag: null,
  }

  handleChangeHashtag = (hashtag: { label: string; value: string }) => {
    this.setState({ hashtag })
  }

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Search: ${this.state.hashtag}`)
  }

  render() {
    const { classes } = this.props

    const selectStyles = {
      input: base => ({
        ...base,
        //color: theme.palette.text.primary,
        "& input": {
          font: "inherit",
        },
      }),
    }

    return (
      <Layout>
        <form className={classes.form} onSubmit={this.handleSearch}>
          <FormControl margin="normal" required fullWidth>
            <NoSsr>
              <Select
                styles={selectStyles}
                className={classes.select}
                textFieldProps={{
                  label: "Hashtag",
                  InputLabelProps: {
                    shrink: true,
                  },
                }}
                classes={classes}
                options={knownHashtags.map(h => ({ label: h, value: h }))}
                components={components}
                value={this.state.hashtag}
                onChange={this.handleChangeHashtag}
                placeholder="Write a hashtag"
              />
            </NoSsr>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <Search color="action" />
            </Button>
          </FormControl>
        </form>
        <List className={classes.messageList}>
          {messages.length > 0 ? (
            messages.map((msg, ix) => (
              <Message
                key={msg.id}
                content={`${ix}. ${msg.content}`}
                username={msg.username}
                actionBar={false}
              />
            ))
          ) : (
            <div>
              <Typography variant="body2">
                No messages with that hashtag
              </Typography>
            </div>
          )}
        </List>
      </Layout>
    )
  }
}

export default withStyles(styles)(HashtagsPage)
