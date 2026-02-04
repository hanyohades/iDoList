import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({filter}) => {
  return (
    <Card
        className = "p-8 text-center border-0 bg-gradient-card shadow-custom-md"
    >
        <div className = "space-y-3">
            <Circle className = "mx-auto size-12 text-muted-foreground"/>

            <div>
                <h3 className = "font-medium text-foreground">
                    {filter === "active" 
                    ? "You have nothing to do 😲"
                    : filter === "completed"
                    ? "Nothing is finished 😒"
                    : "Your list is empty 🫠"
                    }
                </h3>

                <p className = "text-sm text-muted-foreground">
                    {filter === "all"
                    ? "Add task to begin"
                    : `Change to "All Tasks" to see all your tasks ${
                        filter === "active" ? "Finished." : "Working."
                    }`}
                </p>
             </div>
        </div>
    </Card>
  )
}

export default TaskEmptyState