# Kubernetes Manifests

This folder contains the manifests (yaml) needed to deploy the applications (client, server, and db).

## Features of deploying applications in Kubernetes

- Self Healing
- High Availability
- Rollout and Rollback

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

### Volumes

Once the container is deleted, the associated data is also deleted. To overcome this volumes are used to persist the data.

- emptyDir (persist data in the pod level)
- hostPath (persist data in the node level)

#### Persistent Volumes

PVs won't depend upon a pod or a node. A PV is a piece of storage in the cluster.

#### Persistent Volume Claim

In order to use the PV by the pods, PVC is created.

#### Storage Class

Storage class will create the PVs dynamically using PVC. Once PV is created it will be bound with the PVC.
