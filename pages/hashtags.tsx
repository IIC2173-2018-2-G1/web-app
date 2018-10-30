import React from "react"
import Layout from "../src/components/Layout"
import List from "@material-ui/core/List"
import Message from "../src/components/Message"
import AutoCompleteSearch from "../src/components/AutoCompleteSearch"
import Typography from "@material-ui/core/Typography"
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles"

const styles = (theme: Theme) =>
  createStyles({
    messageList: {
      margin: "auto",
      padding: theme.spacing.unit * 2,
      display: "block",
      flexDirection: "column-reverse",
      overflow: "auto",
    },
  })

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
    console.log(
      `Search: ${this.state.hashtag ? this.state.hashtag.value : null}`,
    )
  }

  render() {
    const { classes } = this.props

    return (
      <Layout>
        <AutoCompleteSearch
          options={knownHashtags}
          handleSearch={this.handleSearch}
          handleChange={this.handleChangeHashtag}
          hashtag={this.state.hashtag}
          placeholder="Write a hashtag"
          label="Hashtag"
        />
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
