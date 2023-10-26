# Kubernetes Manifests

This folder contains the manifests (yaml) needed to deploy the applications (client, server, and db).

## Features of deploying applications in Kubernetes

- Self Healing
- High Availability
- Rollout and Rollback

---

## Note

Any manifest have this attributes in common,

```
apiVersion:
kind:
metadata:

spec:
```

To get apiVersion,

```
kubectl api-resources | grep deployment
```

### Replicaset vs Deployment

- To automate the Rollout and Rollback features of Kubernetes, a kind of Deployment is used.
- ReplicaSet will be automatically created by the Deployment.
- ReplicaSet then creates the pod.
- ReplicaSet can be created alone without deployment, if Rollout and Rollback are not your concern.

### Port Forwarding

Eg. MongoDB

```
kubectl port-forward service/mongo-service 32000:27017
```

---

### Volumes

Once the container is deleted, the associated data is also deleted. To overcome this volumes are used to persist the data.

- emptyDir (persist data in the pod level)
- hostPath (persist data in the node level)

#### Persistent Volumes (PV)

PVs won't depend upon a pod or a node. A PV is a piece of storage in the cluster.

#### Persistent Volume Claim (PVC)

In order to use the PV by the pods, PVC is created.

#### Storage Class

Storage class will create the PVs dynamically using PVC. Once PV is created it will be bound with the PVC.

---

### Stateful Applications

A database is a Stateful application because it stores a state. Any application which persist data inside they all are known as Stateful applications. Others are termed as Stateless application.

### Deployment vs Statefulset

#### Problems with Deployment are,

- In deployment when 2 are more replicas are created then all those replicas will have access to the same PV.
- Due to this all pods will write to same storage which leads to data inconsistency

#### Statefulsets

- This can be solved throught Statefulsets. PV and PVC are created separately everytime when a replica is created.

- Master/Slave architecture is followed. Master pod will handle the write operation and all other pods have only read access.

- Data will be synchronized across pods. Let's say if first slave pod is created then the data will be synchronized from the master. Similarly if the second pod is created then instead synchronizing the data from the master pod, this time the data will be synchronized from the pod before it.

##### Features of Statefulsets

- Separated PVs
- Pods will be created sequentially
- Sticky Identity

### Headless Service

- To define and communicate to the master/slave pods headless service is used.
- When no load balancing is required, headless service is useful to directly route the traffic to a specific pod.

```
spec:
  clusterIp: None
```

- The above spec refers to headless service.

#### DNS Entry

Each pod will have a DNS entry.

For eg.

```
mongo-0.mongo.default.svc.cluster.local:27017
```

#### To get in to the mongo pod

```
kubectl exec -it mongo-0 -- mongo
```

#### Initiate Replicaset for mongo pods

```
rs.initiate(
   {
      _id: "myReplSet",
      version: 1,
      members: [
         { _id: 0, host : "mongodb0.example.net:27017" },
         { _id: 1, host : "mongodb1.example.net:27017" },
         { _id: 2, host : "mongodb2.example.net:27017" }
      ]
   }
)
```

```
rs.status()
```

---

## Reference

1. [Deploy ReplicaSet](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/#std-label-server-replica-set-deploy)
