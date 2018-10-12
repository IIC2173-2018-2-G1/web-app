import * as React from "react"
import Page from "../components/layout/Page"

export interface MainPageProps {}

export interface MainPageState {}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  render() {
    return (
      <Page>
        <div className="jumbotron d-flex flex-column justify-content-around">
          <h1 className="display-2 align-self-end">Hello Arquitrán SPA!</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos hic
            fuga architecto eligendi totam pariatur veritatis suscipit quaerat,
            tempora voluptates ea inventore neque, minus magni unde provident
            mollitia facilis? Eos.
          </p>
        </div>
        <div className="container px-0">
          <div className="row">
            {[1, 2, 3].map(key => (
              <div className="col-sm-12 col-md-6 col-lg-4 my-2" key={key}>
                <div className="card">
                  <img
                    className="card-img-top"
                    src={`https://picsum.photos/340/170/?image=${key * 7}`}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          .jumbotron {
            background-color: #424950;
          }

          .card {
            background-color: #212127;
          }
        `}</style>
      </Page>
    )
  }
}

export default MainPage
