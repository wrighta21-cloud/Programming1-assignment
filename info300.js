const readline = require('readline-sync');

function runTool() {
    let keepRunning = true;

    while (keepRunning) {
        console.log("INFRASCTRUCTURE DESCISION TOOL");
        console.log("Option #1: Subnet Host Checker");
        console.log("Option #2:Enviorment Selector");
        console.log("Option #3: Exit")
    
        const choice = readline.question("Please select option (1-3):");

        if (choice === '1') {
            runSubnetHostChecker();
        } else if (choice === '2') {
            runEnviormentSelector();
        } else if (choice === '3') {
            console.log("Exiting the program. See you later!")
            keepRunning = false;
        } else {
            console.log("Choice is invalid. Please enter 1, 2 or 3.")
        }

        if (keepRunning) {
            const continueRun = readline.question("\nWould you like to run another check? (yes/no): ").toLowerCase();
            if (continueRun !== 'yes' && continueRun !== 'y') {
                keepRunning = false;
                console.log("Exiting the program. See you later!");
            }
        }
    }
}
        

        

        
        
        //Part A: The subnet host checker
        function runSubjectHostChecker() {
            console.log("\nSUBNET HOST CHECKER");

            // Prompt for the VPC CIDR prefix 
            const vpcMask = parseInt(readline.question("Enter the VPC CIDR prefix (between 16 and 30): "),10);
            //Prompt for the subject CIDR prefic 
            const subnetMask = parseInt(readline.question("Enter Subnet CIDR prefix (between 16 and 30); "),10);
            //Prompt for device required 
            const deviceRequired = parseInt(readline.question("Enter the number of devices required: "),10);

            //Input Validation
            if (isNaN(vpcMask) || isNaN(subnetMask) || isNaN(deviceRequired) ||
            vpcMask < 16 || vpcMask > 30 || subnetMask < 16 || subnetMask > 30 || deviceRequired <= 0) {
                console.log("Error Occured: CIDR prefix must be between 16 and 30, and devices must be a postive integer.");
                return;
            }
        
    
        
        if (subnetMask < vpcMask) {
            console.log("Error Occured: Subnet CIDR prefix must be greater than or equal to VPC CIDR prefix.");
            return; 
        }
        if (subnetMask < vpcMask) {
            console.log("Error Occured: Subnet CIDR prefix must be greater then the VPC CIDR.");
            return;
        }
        // Check for consistency making sure subnet CIDR is consistent if it fits inside or match the VPC CIDR
        const isConsistent = subnetMask >= vpcMask;
        console.log(`\nConsistency Check: Subnet CIDR (/${subnetMask}) is ${isConsistent ? "consistent" : "inconsistent"} with VPC CIDR (/${vpcMask}).`);

        //Total amount of IP addresses in the subnet 2^*(32 - subnetMask)
        const totalIPs = Math.pow(2, 32 - subnetMask);
        // AWS holds 5 ip addresses per subnet 
        const usableIPs = totalIPs - 5;

        console.log(`Total Ips in /${subnetMask}:${totalIPs}`);
        console.log(`Usable Ips (minus 5 reserved by AWS): ${usableIPs}[site: 9]`);

        if (usableIps >= deviceRequired) {
            const unusedIPs = useableIps - deviceRequired;
            console.log(`Notice: The subnet is sufficient for the ${deviceRequired} devices required[cite:9].`);
            console.log(`Unused IP addresses remaining: ${unusedIPs}`);
        } else {
            const neededIPs = deviceRequired - usableIps;
            console.log(`Warning; The subnet is insufficient for the ${deviceRequired} devices required[cite:9].`);
            console.log(`Additional IP addresses needed: ${neededIPs}[cite:9]`);
        }
    }



            // Part B: The environment selector
            function runEnviormentSelector() {
                console.log("\nENVIRONMENT SELECTOR");

                const appName = readline.question("Please enter Application Name:");
                const monthlyUsers = parseInt(readline.question("Please enter the expected monthly users: "),10);
                const monthlyBudget = parseFloat(readline.question("Please enter the Monthly budget ($): "));
                const haInput = readline.question("Requires High Availability? (yes/no): ").toLowerCase();
                const highAvaliability = (haInput === 'yes' || haInput === 'y');

                if (isNaN(monthlyUsers) || isNaN(monthlyBudget) || monthlyUsers < 0 || monthlyBudget < 0) {
                    console.log("Error Occured: Monthly users and budget must be a postive number.");
                    return;
        
                }

                let recommendation = "";
                
                //Guideline logic 
                if (monthlyUsers <10000 || highAvaliability) {
                    recommendation = "EC2 + Load Balancer + Autoscaling";
                } else if (monthlyUsers >= 1000 && monthlyUsers < 1000) {
                    recommendation = "EC2 + Load Balancer";
                }else  {
                    recommendation = " 1 EC2 Instance";
        
                }

                console.log(`\nApplication: ${appName}`);
                console.log(`Expected Architecture: ${recommendation}[cite:9]`);


                //Bugdet Warning 
                if (monthlyBudget < 1000) {
                    if (recommendation !== "1 EC2 Instance") {
                    console.log( "ALERT: Budget is under $1000, but the recommended architecture needs more then 1 EC2 instance[cite:9]!");

                    }
                } else if (monthlyBudget >= 1000 && monthlyBudget <= 3000) {
                    if (recommendation.includes("Autoscaling")) {
                        console.log("ALERT: Budget is between $1000 and $3000, but the recommended architecture includes Autoscaling[cite:9]!");
                            
                    }
                }
            }

// Start the program 
runTool();
    