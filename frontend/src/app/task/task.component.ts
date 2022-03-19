import { UserService } from './../service/user-service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaskService } from 'src/app/service/task-service';

@Component({
    templateUrl: './task.component.html',
    providers: [MessageService, ConfirmationService],
})
export class TaskComponent implements OnInit {

    finished: boolean = false;
    openDialog: boolean;
    deleteDialog: boolean;

    task: any;
    tasks: any[] = []
    users: any[] = []
    enumSituation: any[];
    enumPriority: any[];


    constructor(private service: TaskService, private messageService: MessageService, private userService: UserService) { }

    ngOnInit() {
        this.findAllTask()
        this.userService.findAll().subscribe({
            next: (res) => this.users = res
        })

        this.enumSituation = [
            { label: 'ToDo', code: 'TODO', },
            { label: 'Doing', code: 'DOING' },
            { label: 'Done', code: 'DONE' },
        ];

        this.enumPriority = [
            { label: 'None', code: 'NONE' },
            { label: 'Low', code: 'LOW' },
            { label: 'High', code: 'HIGH' },
        ];
    }

    opewNewTask() {
        this.task = {
            inicialDate: new Date(),
            endDate: new Date()
        }
        this.openDialog = true;
    }

    hideDialog() {
        this.openDialog = false;
    }

    save() {
        this.service.save(this.task).subscribe({
            complete: () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Updated', life: 3000 });
                this.findAllTask();
                this.openDialog = false;
                this.task = {};
            }
        })
    }

    delete() {
        this.service.delete(this.task).subscribe({
            complete: () => {
                this.openDialog = false;
                this.deleteDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 });
                this.findAllTask()
            }
        })
    }

    findAllTask(): void {
        this.service.findAllByUser().subscribe({
            next: (res) => this.tasks = res
        });
    }

    openTask(task: any) {
        this.service.getById(task.id).subscribe({
            next: (res) => this.task = res
        });
        this.openDialog = true;
    }

    changeColorOfIcon(label: string) {
        const newLabel = label.toLocaleUpperCase()
        return newLabel === 'LOW' ? 'text-green-500' : newLabel === 'HIGH' ? 'text-orange-500' : 'text-blue-500'
    }
    changeBackground(label: string) {
        const newLabel = label.toLocaleUpperCase()
        return newLabel === 'LOW' ? 'bg-green-100' : newLabel === 'HIGH' ? 'bg-orange-100' : 'bg-blue-100'
    }

    get tasksToDo() {
        return this.tasks.filter(res => res.situation === 'TODO')
    }

    get taskDoing() {
        return this.tasks.filter(res => res.situation === 'DOING')
    }

    get taskDone() {
        return this.tasks.filter(res => res.situation === 'DONE')
    }
}
