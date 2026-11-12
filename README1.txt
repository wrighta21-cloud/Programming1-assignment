SUFFICIENT SUBNET
VPC CIDR PREFIX: /16 
Subnet CIDR PREFIX: /22 (2^32-22=1024) AWS  reserves 5 of ip addresses so we are left with 1019 usuable ip addresses 

If we ask the tool for 45 devices we have plenty of ip's and will have 974 left




INSUFFICIENT SUBNET: 
Subnet CIDR PREFIX: /25 (2^32-29=8) AWS  reserves 5 of ip addresses so we are left with 3 usuable ip addresses 

If we ask the tool for 10 devices we dont have enough ip's and will need 7 additional ips