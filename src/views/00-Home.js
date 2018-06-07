
              <div className="d-flex justify-content-center">
                <SimpleTasksLineChart/>
                <div className="ml-5 mr-5"></div>
                <SimpleProjectsLineChart projects={this.state.projects || []}/>
              </div>