import React, { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axios';

const AddTask = ({handleNewTaskAdded}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if(newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {title: newTaskTitle});
        toast.success(`${newTaskTitle} task is added! 👍`);
        handleNewTaskAdded();
      } catch(error) {
        console.error("Error while adding new task", error),
        toast.error("Error while adding new task. Try again later.")
      }

      setNewTaskTitle("");
      
    } else {
      toast.error("Nothing is typed! You should type your task.")
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    };
  }

  return (
    <Card className = "p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className = "flex flex-col gap-3 sm:flex-row">
        <Input
          type = "text"
          placeholder = "I need to do ..."
          className = "h-12 text-base bg-slate-50 sm:flex-1 border-boder/50 focus:border-primary/50 focus:ring-primary/20"
          value = {newTaskTitle}
          onChange = {(even) => setNewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick = {addTask}
          disabled ={!newTaskTitle.trim()}
        >
          <Plus className="size-5"/>
          Add
        </Button>
      </div>
    </Card>

  );
};

export default AddTask