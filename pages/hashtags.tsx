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
  hashtag: string
}

@inject("hashtagStore")
@inject("userStore")
@observer
class HashtagsPage extends React.Component<
  HashtagsPageProps,
  HashtagsPageState
> {
  state = {
    hashtag: "",
  }

  componentDidMount() {
    this.props.hashtagStore.setHashtagList()
  }

  handleChangeHashtag = (hashtag: string) => {
    this.setState({ hashtag })
  }

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (this.state.hashtag) {
      this.props.hashtagStore.getMessages(this.state.hashtag)
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Layout>
        <AutoCompleteSearch
          options={this.props.hashtagStore.currentHashtagList}
          handleSearch={this.handleSearch}
          handleChange={this.handleChangeHashtag}
          hashtag={this.state.hashtag}
          placeholder="Write a hashtag"
          label="Hashtag"
        />
        <List className={classes.messageList}>
          {this.props.hashtagStore.currentMessages.length > 0 ? (
            this.props.hashtagStore.currentMessages.map(msg => {
              const user = this.props.userStore.allUsers[msg.user_id]
              return (
                <Message
                  key={msg.id}
                  content={msg.content}
                  first_name={user.first_name}
                  last_name={user.last_name}
                  username={user.username}
                  actionBar={true}
                />
              )
            })
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
