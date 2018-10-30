import React from "react"
import FormControl from "@material-ui/core/FormControl"
import Select from "react-select"
import Button from "@material-ui/core/Button"
import Search from "@material-ui/icons/Search"
import NoSsr from "@material-ui/core/NoSsr"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
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

export interface AutoCompleteSearchProps extends WithStyles<typeof styles> {
  hashtag: { label: string; value: string }
  options: string[]
  handleChange: (value: { label: string; value: string }) => void
  handleSearch: (event: React.FormEvent) => void
  placeholder: string
  label: string
}

export interface AutoCompleteSearchState {}

class AutoCompleteSearch extends React.Component<
  AutoCompleteSearchProps,
  AutoCompleteSearchState
> {
  constructor(props: AutoCompleteSearchProps) {
    super(props)
    this.state = {}
  }

  public render() {
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
      <form className={classes.form} onSubmit={this.props.handleSearch}>
        <FormControl margin="normal" required fullWidth>
          <NoSsr>
            <Select
              styles={selectStyles}
              className={classes.select}
              textFieldProps={{
                label: this.props.label,
                InputLabelProps: {
                  shrink: true,
                },
              }}
              classes={classes}
              options={this.props.options.map(h => ({ label: h, value: h }))}
              components={components}
              value={this.props.hashtag}
              onChange={this.props.handleChange}
              placeholder={this.props.placeholder}
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
    )
  }
}

export default withStyles(styles)(AutoCompleteSearch)
