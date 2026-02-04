import React from 'react'

const Footer = ({completedTasksCount = 0, activeTasksCount = 0}) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className = "text-center">
          <p className = "text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🥳 Hooray! {completedTasksCount} task{completedTasksCount !== 1 && "s"} done{
                  activeTasksCount > 0 && `, ${activeTasksCount} to go. You got this💪`
                }
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>🫵 You have {activeTasksCount} task{activeTasksCount !== 1 && "s"}. Let get {activeTasksCount === 1 ? "it" : "them"} done now! </>
            )}
          </p>
        </div>
      )}
    
    </>
  )
}

export default Footer