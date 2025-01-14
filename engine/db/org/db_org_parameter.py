
class orgApiPara:

    setOrg_POST_request = {"host": {"type": str, "default": ''},
                           "port": {"type": int, "default": 636},
                           "cer_path": {"type": str, "default": ''},
                           "use_sll": {"type": bool, "default": True},
                           "admin": {"type": str, "default": ''},
                           "admin_pwd": {"type": str, "default": ''},
                           "admin_group": {"type": str, "default": ''},
                           "base_group": {"type": str, "default": ''},
                           "org_name": {"type": str, "default": ''},
                           "des": {"type": str, "default": ''},
                           "search_base": {"type": str, "default": ''}},

    updateOrg_POST_request = {"id": {"type": int, "default": -1},
                            "host": {"type": str, "default": ''},
                           "port": {"type": int, "default": 636},
                           "cer_path": {"type": str, "default": ''},
                           "use_sll": {"type": bool, "default": True},
                           "admin": {"type": str, "default": ''},
                           "admin_pwd": {"type": str, "default": ''},
                           "admin_group": {"type": str, "default": ''},
                           "base_group": {"type": str, "default": ''},
                           "org_name": {"type": str, "default": ''},
                           "des": {"type": str, "default": ''},
                           "search_base": {"type": str, "default": ''}},

    setOrg_POST_response = {
                            "ldap_id": {"type": int, "default": -1},
                            "org_id": {"type": int, "default": -1},
                            "host": {"type": str, "default": ''},
                           "port": {"type": int, "default": 636},
                           "cer_path": {"type": str, "default": ''},
                           "use_sll": {"type": bool, "default": True},
                           "admin": {"type": str, "default": ''},
                           "admin_pwd": {"type": str, "default": ''},
                           "admin_group": {"type": str, "default": ''},
                           "base_group": {"type": str, "default": ''},
                           "org_name": {"type": str, "default": ''},
                           "des": {"type": str, "default": ''},
                            "search_base": {"type": str, "default": ''}}

    updateOrg_POST_response = {
                            "ldap_id": {"type": int, "default": -1},
                            "org_id": {"type": int, "default": -1},
                            "host": {"type": str, "default": ''},
                           "port": {"type": int, "default": 636},
                           "use_sll": {"type": bool, "default": True},
                           "cer_path": {"type": str, "default": ''},
                           "admin": {"type": str, "default": ''},
                           "admin_pwd": {"type": str, "default": ''},
                           "admin_group": {"type": str, "default": ''},
                           "base_group": {"type": str, "default": ''},
                           "org_name": {"type": str, "default": ''},
                           "des": {"type": str, "default": ''},
                            "search_base": {"type": str, "default": ''}}