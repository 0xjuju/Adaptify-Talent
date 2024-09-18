
interface ReplicaSetMember {
    _id: number;
    name: string;
    stateStr: string;
    health: number;
    uptime: number;
    optime: { ts: Date; t: number };
    lastHeartbeat: Date;
    lastHeartbeatRecv: Date;
    electionDate?: Date;
    configVersion: number;
}

export default ReplicaSetMember;

