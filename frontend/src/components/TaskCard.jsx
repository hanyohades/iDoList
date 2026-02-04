import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ApertureIcon, Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { Input } from './ui/input';

const TaskCard = ({task, index, handleTaskChanged}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "")


    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success(`Task is deleted 🗑️`);
            handleTaskChanged();

        } catch (error) {
            console.error("Error! Something is wrong in deleteTask", error);
            toast.error("Error! Something is wrong, try again later.");
        }
    }
    
    const updateTask = async() => {
        try {
            setIsEditing(false);
            await api.put(`/tasks/${task._id}`, {title: updateTaskTitle});
            toast.success(`Success! Your task is updated to ${updateTaskTitle}`)
            handleTaskChanged();
        } catch(error) {
            console.error("Error! Something is wrong in updateTask", error);
            toast.error("Error! Something is wrong, try again later.")
        }
    }
    
    const toggleTaskCompleteButton = async () => {
        try {
            if(task.status === "active") {
                await api.put(`/tasks/${task._id}`, {status: "complete",
                    completedAt: new Date().toISOString(),
                });

                toast.success(`${task.title} is finished 🎉`)
            } else {
                await api.put(`/tasks/${task._id}`, {
                    status: "active",
                    completedAt: null,
                });
                toast.success(`${task.title} is changed to incompleted`)
            }

            handleTaskChanged();
        } catch(error) {
            console.error("Error! Something is wrong in toggleTaskCompleteButton", error)
            toast.error("Error! Something is wrong, try again later.")
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            updateTask();
        };
    }

  return (
    <Card className ={cn("p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group", 
        task.status === "complete" && "opacity-75")}
        style = {{ animationDelay: `${index*50}ms`}}
    >
        <div className = "flex items-center gap-4">
            {/* Circle button */}
            <Button
                variant = "ghost"
                size = "icon"
                className = {cn(
                    "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                    task.status === "complete"
                    ? "text-success hover:text-success/80"
                    : "text-muted-foreground hover:text-primary"
                )}
                onClick ={toggleTaskCompleteButton}
            >
                {task.status === "complete" ? (
                    <CheckCircle2 className = "size-5" />)
                    :(
                    <Circle className = "size-5" /> )
                }
            </Button>

            {/*Show or change the task's title */}
            <div className = "flex-1 min-w-0">
                {isEditing ? (
                    <Input 
                        placeholder = "I want to do ..."
                        className = "flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                        type = "text"
                        value = {updateTaskTitle}
                        onChange = {(e) => setUpdateTaskTitle(e.target.value)}
                        onKeyPress = {handleKeyPress}
                        onBlur = {() => {
                            setIsEditing(false);
                            setUpdateTaskTitle(task.title || "");
                        }}
                    />
                ) : (
                    <p className = {cn(
                        "text-base transition-all duration-200",
                        task.status === "complete" 
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    )}>
                        {task.title}
                    </p>
                )}

            {/* Created & finished date}*/}
            <div className = "flex items-center gap-2 mt-1">
                <Calendar className = "size-3 text-muted-foreground"/>
                <span className = "text-xs text-muted-foreground">
                    {new Date(task.createdAt).toLocaleString()}
                </span>
                {task.completedAt && (
                    <>
                        <span className = "text-xs text-muted-foreground"> - </span>
                        <Calendar className = "size-3 text-muted-foreground" />
                        <span className = "text-xs text-muted-foreground">
                            {new Date(task.completedAt).toLocaleString()}
                        </span>
                    </>
                )}
            </div>

            </div>
            
            {/* edit and delete buttons*/}
            <div className = "hidden gap-2 group-hover:inline-flex animate-slide-up">
                {/* Edit button */}
                <Button
                    variant = "ghost"
                    size = "icon"
                    className = "flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                    onClick = {() => {
                        setIsEditing(true);
                        setUpdateTaskTitle(task.title || "");
                    }}    
                >
                        <SquarePen className = "size-4" />
                </Button>
                 {/* Delete button */}
                <Button
                    variant = "ghost"
                    size = "icon"
                    className = "flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                    onClick = {() => deleteTask(task._id)} 
                >
                    <Trash2 className = "size-4" />
                </Button>
            </div>
        </div>
    </Card>
  );
};

export default TaskCard;