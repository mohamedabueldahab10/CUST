#if((Get-PSSnapin | Where {$_.Name -eq "Microsoft.SharePoint.PowerShell"}) -eq $null) {
#	Add-PSSnapin Microsoft.SharePoint.PowerShell; 
#}

Add-PSSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue
Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll"
Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.Runtime.dll"

$siteUrl = "http://hrsd-spm-sp3:26261"
$filesPath = "C:\Users\b.tohme_p\Desktop\HRSD Deployment Folder - V29-March\"

$CTX = New-Object Microsoft.SharePoint.Client.ClientContext($siteUrl)
$username = "b.tohme"
$password = ConvertTo-SecureString "Aa@12345123453322" -AsPlainText -Force
$CTX.Credentials = New-Object System.Management.Automation.PSCredential -ArgumentList ($username, $password)
$web = $CTX.Web
$CTX.Load($web)
$CTX.ExecuteQuery()

Write-Host $CTX.Web.Title -ForegroundColor Yellow

#Function to create custom list
Function CreateLists($context)
{
    #Set the Error Action
    $ErrorActionPreference = "Stop"
 
    Try {
        
        $SPLists = $context.Web.lists
        $context.load($SPLists)
        $context.ExecuteQuery()
        $context.Load($context.Web.Lists)
        $context.ExecuteQuery()

        $fileName = $filesPath + "Lists.xml"
        [xml]$listXml = Get-Content $fileName -encoding UTF8
        

        foreach ($list in $listXml.Lists.List)
        {    
			try{
 
                    $SPList = $SPLists | where{$_.Title -eq $list.DisplayName}
				    #Check if List with specific DisplayName exists
				    if($SPList )
				    {
					    write-host "List with specific DisplayName '" $list.DisplayName "' already exists!" -ForegroundColor Red
					    
                    }
				    else
				    {
					    $ListInfo = New-Object Microsoft.SharePoint.Client.ListCreationInformation
                        $ListInfo.Title = $list.InternalName
                        $ListInfo.Description = $list.DisplayName
					    $listinfo.TemplateType = [Microsoft.SharePoint.Client.ListTemplateType]'GenericList'
					
					
					    $myList = $web.Lists.Add($ListInfo) 
					    $context.ExecuteQuery()
					
					    $myList.Title = $list.DisplayName
                        $myList.Update()
                        $context.ExecuteQuery()
					
					    write-host "List: '" $list.DisplayName "' Created Successfully!" -ForegroundColor Green
					
					    # create the fields
					    CreateFields $context $list.InternalName $list.DisplayName
				    }
				}
			
            catch {
                Write-Host "CreateList1: " $_.Exception.Message -ForegroundColor Red
            }
        }
    }
    catch {
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    finally {
        #Reset the Error Action to Default
        $ErrorActionPreference = "Continue"
    }
}

#[Create Fields from XML]
function CreateFields($context, $listInternalName, $listDisplayName)
{
	 Try{
        $fileName = $filesPath + $listInternalName + ".xml"

        [xml]$fieldXml = Get-Content $fileName -encoding UTF8     
        #Retrive all Fields from the list
         
        $SPLists = $context.Web.lists
        $context.load($SPLists)
        $context.ExecuteQuery()

        $List = $SPLists | where{$_.Title -eq $listDisplayName}
        $context.Load($List)
        $context.ExecuteQuery()

        $SPFields = $List.Fields
        $context.Load($SPFields)
        $context.ExecuteQuery()

        foreach ($field in $fieldXml.Fields.Field)
        {
            try{
                #Check if the given field name
                $SPField = $SPFields | where{$_.StaticName -eq $field.Name} 
                if($SPField) {                  
                    if($SPField.Title = "Title")
                    {
                        $SPField.Title = $field.DisplayName
                        $SPField.Update()
                        $List.Update()
                        $context.ExecuteQuery()
                    }
                } 
                else { 
                   $CreateField=  $List.Fields.AddFieldAsXml($field.OuterXml,$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldInternalNameHint)

                    $context.ExecuteQuery()
		            Write-Host "Field: '"   $field.Name  "' Created successully" -ForegroundColor Yellow   
                }
            }
            
            catch {
                Write-Host "CreateFields - "  $SPField.Title ":- " $_.Exception.Message -ForegroundColor Red
            } 
        }
    
    }
    catch {
        Write-Host "CreateFields: " $_.Exception.Message -ForegroundColor Red
    }
    finally {
        $ErrorActionPreference = "Continue"
    }
}

Write-Host "Deployment started on " + $web.Url

CreateLists $CTX

Write-Host "Deployment Done"