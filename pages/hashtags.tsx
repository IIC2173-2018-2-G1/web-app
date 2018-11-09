import React from "react"
import { inject, observer } from "mobx-react"
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
import { HashtagStore } from "../src/stores/HashtagStore"
import { UserStore } from "../src/stores/UserStore"

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

export interface HashtagsPageProps extends WithStyles<typeof styles> {
  hashtagStore?: HashtagStore
  userStore?: UserStore
}

export interface HashtagsPageState {
  hashtag: { label: string; value: string }
}

@inject("hashtagStore")
@inject("userStore")
@observer
class HashtagsPage extends React.Component<
  HashtagsPageProps,
  HashtagsPageState
> {
  state = {
    hashtag: null,
  }

  componentDidMount() {
    this.props.hashtagStore.setHashtagList()
  }

  handleChangeHashtag = (hashtag: { label: string; value: string }) => {
    this.setState({ hashtag })
  }

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO handle start and count when scrolling
    if (this.state.hashtag) {
      this.props.hashtagStore.getMessages(this.state.hashtag.value, 0, 50)
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Layout>
        <AutoCompleteSearch
          options={this.props.hashtagStore.currentHashtagList.map(
            hs => hs.name,
          )}
          handleSearch={this.handleSearch}
          handleChange={this.handleChangeHashtag}
          hashtag={this.state.hashtag}
          placeholder="Write a hashtag"
          label="Hashtag"
        />
        <List className={classes.messageList}>
          {this.props.hashtagStore.currentMessages.length > 0 ? (
            this.props.hashtagStore.currentMessages.map((msg, ix) => (
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
