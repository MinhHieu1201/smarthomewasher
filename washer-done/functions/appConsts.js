export class GoogleDeviceTypes {

    //Air conditioning units are similar to thermostats, but do not support heating and may not support setting temperature targets.
    // FanSpeed
    // OnOff
    // TemperatureSetting
    static AC_UNIT = "AC_UNIT";
    // Air coolers are devices that allow temperature cooling and humidity control. These devices are typically more lightweight and portable than air conditioners, and have a water tank attached. Air coolers may not support heating or setting exact temperatures. Interactions with air coolers may include changing the fan speed and humidity setting.	
    // Required:

    // FanSpeed
    // HumiditySetting
    // OnOff
    // TemperatureSetting
    static AIRCOOLER = "AIRCOOLER";
    //     Air fresheners can be turned on and off and may allow adjusting various modes.	
    // Recommended:
    // Modes
    // Toggles
    // Required:
    // OnOff
    static AIRFRESHENER = "AIRFRESHENER";
    // Air purifiers are devices that may be turned on and off, report air filter cleanliness and air filter lifetime, and be adjusted to various mode settings.	
    // Recommended:
    // FanSpeed
    // SensorState
    // Required:
    // OnOff
    static AIRPURIFIER = "AIRPURIFIER";

    // Device that takes audio input (for example, HDMI, optical, and RCA) and outputs sound to one or more speakers.	
    // Recommended:

    // AppSelector
    // Required:

    // InputSelector
    // MediaState
    // OnOff
    // TransportControl
    // Volume
    static AUDIO_VIDEO_RECEIVER = "AUDIO_VIDEO_RECEIVER";

    // Awnings are retractable and can opened and closed. They can be installed indoors or outdoors.	
    // Required:

    // OpenClose
    static AWNING = "AWNING";

    static BATHTUB = "BATHTUB";

    static BED = "BED";

    static BLENDER = "BLENDER";

    static BLINDS = "BLINDS";

    static BOILER = "BOILER";

    static CAMERA = "CAMERA";

    static CARBON_MONOXIDE_DETECTOR = "CARBON_MONOXIDE_DETECTOR";

    static CHARGER = "CHARGER";

    static CLOSET = "CLOSET";

    static COFFEE_MAKER = "COFFEE_MAKER";

    static COOKTOP = "COOKTOP";

    static CURTAIN = "CURTAIN";

    static DEHUMIDIFIER = "DEHUMIDIFIER";

    static DEHYDRATOR = "DEHYDRATOR";

    static DISHWASHER = "DISHWASHER";

    static DOOR = "DOOR";



    // Doorbells can let people know someone is at the door. This device can send notifications and stream video if it has the corresponding capability.	
    // Recommended:

    // ObjectDetection
    // CameraStream
    static DOORBELL = "DOORBELL"

    // Drawers can be opened and closed, potentially in more than one direction.	
    // Required:

    // OpenClose
    static DRAWER = "DRAWER";

    // Dryers have start and stop functionality independent from being on or off. Some can be paused and resumed while drying. Dryers also have various modes and each mode has its own related settings. These are specific to the dryer and are interpreted in a generalized form.	
    // Recommended:

    // Modes
    // OnOff
    // RunCycle
    // Toggles
    // Required:
    // StartStop
    static DRYER = "DRYER";

    // 	Fans can typically be turned on and off and have speed settings. Some fans may also have additional supported modes, such as fan direction/orientation (for example, a wall unit may have settings to adjust whether it blows up or down).	
    // Required:

    // FanSpeed
    // OnOff
    static FAN = "FAN";

    // 	Faucets can dispense liquids in various quantities and presets. Faucets may have various modes and each mode has its own related settings. These are specific to the faucet and are interpreted in a generalized form.	
    // Recommended:

    // Dispense
    // StartStop
    // TemperatureControl
    static FAUCET = "FAUCET";
    // Fireplaces can be turned on and off, and may have adjustable modes.	
    // Recommended:

    // Modes
    // Toggles
    // OnOff
    static FIREPLACE = "FIREPLACE";
    // 	Freezers are temperature-managing devices which may be adjusted to various mode settings, and may allow temperature monitoring.	
    // Required:

    // TemperatureControl
    static FREEZER = "FREEZER";
    // 	Interactions with fryers may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.	
    // Recommended:

    // Cook
    // StartStop
    // Timer
    // Required:

    // OnOff
    static FRYER = "FRYER";
    // Garage doors can open, close, and detect an open state. They can also indicate if an object has obstructed the path of the door while closing or if the door is locked and therefore cannot be controlled.	
    // Recommended:

    // LockUnlock
    // Required:

    // OpenClose
    static GARAGE = "GARAGE";
    // Gates can be opened and closed, potentially in more than on direction.	
    // Recommended:

    // LockUnlock
    // Required:

    // OpenClose
    static GATE = "GATE";
    // Interactions with grills may include turning them on and off, starting and stopping, setting a timer, adjusting cooking modes and food presets, and adjusting various non-cooking mode settings.	
    // Recommended:

    // Cook
    // OnOff
    // Timer
    // Required:

    // StartStop
    static GRILL = "GRILL";
    // Heaters are similar to thermostats but do not support cooling and may not support setting temperature targets.	
    // Recommended:

    // FanSpeed
    // Required:

    // TemperatureSetting
    static HEATER = "HEATER";

    // 	Oven and range hoods can be turned on and off, may have adjustable modes, and may have adjustable fan speeds.	
    // Recommended:

    // Brightness
    // FanSpeed
    // Required:

    // OnOff
    static HOOD = "HOOD";
    // 	Humidifiers are devices that add moisture to the air. They can be turned on and off, report and adjust target humidity, and may have various adjustable modes or fan speed settings.	
    // Recommended:

    // FanSpeed
    // HumiditySetting
    // StartStop
    // Required:

    // OnOff
    static HUMIDIFIER = "HUMIDIFIER";

    // 	Kettles are devices that boil water. Interactions with kettles may include turning them on and off, adjusting the target temperature, and perhaps adjusting various mode settings.	
    // Recommended:

    // TemperatureControl
    // Required:

    // OnOff
    static KETTLE = "KETTLE";

    // Light devices can be turned on and off. They may have additional features, such as dimming and the ability to change color.	
    // Recommended:

    // ColorSetting
    // Brightness
    // Required:

    // OnOff
    static LIGHT = "LIGHT";

    // Locks can lock, unlock, and report a locked state.	
    // Required:

    // LockUnlock
    // MICROWAVE	Interactions with microwaves may include starting and stopping, setting a timer, adjusting cooking modes and food presets, and adjusting non-cooking modes.	
    // Recommended:

    // Cook
    // Timer
    // Required:

    // StartStop
    static LOCK = "LOCK";
    // 	Interactions with mops may include starting, stopping, pausing cleaning, docking, checking the current cleaning cycle, locating the mop, or adjusting various modes. Some mops may support cleaning specific zones in the home.	
    // Recommended:

    // Dock
    // EnergyStorage
    // Locator
    // OnOff
    // RunCycle
    // Required:

    // StartStop
    static MOP = "MOP";

    // 	Interactions with mowers may include starting, stopping and pausing mowing, docking, checking the current cycle, locating the mower, and adjusting various modes.	
    // Recommended:

    // Dock
    // EnergyStorage
    // Locator
    // OnOff
    // RunCycle
    // Required:

    // StartStop
    static MOWER = "MOWER";

    // 	Interactions with multicookers may include starting and stopping, setting a timer, or and adjusting non-cooking modes.	
    // Recommended:

    // Cook
    // StartStop
    // Timer
    // Required:

    // OnOff
    static MULTICOOKER = "MULTICOOKER";

    // Represents a group of router nodes or a mesh network controlled as one entity rather than as individual devices. The network device may reboot, update its software, and have modes to handle Quality of Service (QoS) controls and parental restrictions. The device can perform operations such as enabling the guest network, and reporting network-specific information such as the current internet throughput rates.	
    // Recommended:

    // Reboot
    // SoftwareUpdate
    // Required:

    // NetworkControl
    static NETWORK = "NETWORK";

    // 	Outlet, a basic device in Smart Home, has binary modes on/off only.	
    // Required:

    // OnOff
    static OUTLET = "OUTLET";

    // 	Interaction with ovens involves the ability to bake or broil at certain temperatures. The physical temperature inside the oven differs as the oven is heating, so this may also be monitored. The oven has a cook time that limits the duration of baking.	
    // Recommended:

    // Cook
    // TemperatureControl
    // Timer
    // Required:

    // OnOff
    static OVEN = "OVEN";

    // 	Pergolas (an outdoor garden structure) can be opened and closed, potentially in more than one direction. For example, some pergolas with a canvas may open either to the LEFT or RIGHT.	
    // Recommended:

    // Rotation
    // Required:

    // OpenClose
    static PERGOLA = "PERGOLA";

    // 	Interactions with pet feeders may include dispensing pet food or water in various quantities and presets.	
    // Recommended:

    // OnOff
    // StartStop
    // Required:

    // Dispense
    static PETFEEDER = "PETFEEDER";

    // 	Interactions with pressure cookers may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.	
    // Recommended:

    // Cook
    // Timer
    // Required:

    // OnOff
    static PRESSURECOOKER = "PRESSURECOOKER";

    // 	Radiators can be turned on and off and may allow adjusting various modes.	
    // Recommended:

    // Modes
    // Toggles
    // Required:

    // OnOff
    static RADIATOR = "RADIATOR";

    // 	Refrigerators are temperature-managing devices which may have various modes/settings.	
    // Required:

    // TemperatureControl
    static REFRIGERATOR = "REFRIGERATOR";

    // 	Media remotes are used to control media devices. Examples of this device type include hubs, universal remotes, and media controllers.	
    // Recommended:

    // AppSelector
    // Channel
    // Required:

    // InputSelector
    // MediaState
    // OnOff
    // TransportControl
    // Volume
    static REMOTECONTROL = "REMOTECONTROL";

    // 	Routers can reboot, update their software, have modes to handle Quality of Service (QoS) controls and parental restrictions, and perform network specific operations (such as enabling the guest network and reporting network specific information such as the current internet throughput rates).	
    // Recommended:

    // Reboot
    // SoftwareUpdate
    // Required:

    // NetworkControl
    static ROUTER = "ROUTER";

    // 	In the case of scenes, the type maps 1:1 to the trait, as scenes don't combine with other traits to form composite devices. Scenes should always have user-provided names. Each scene is its own virtual device, with its own name(s).	
    // Required:

    // Scene
    static SCENE = "SCENE";

    // 	Security systems can be armed and disarmed. They can be armed at multiple security levels (for example, home and away) and they can report information about certain sensors, such as a sensor that detects motion or an open window.	
    // Recommended:

    // StatusReport
    // Required:

    // ArmDisarm
    static SECURITYSYSTEM = "SECURITYSYSTEM";

    // 	A single sensor can serve multiple functions, such as monitoring both temperature and humidity. Sensors may report either or both quantitative—for example, carbon monoxide and smoke level measured at parts per million—and qualitative measurements (such as whether air quality is healthy or unhealthy).	
    // Recommended:

    // SensorState
    // EnergyStorage
    static SENSOR = "SENSOR";
    // 	Interactions with Multichannel Video Programming Distributor (MVPD) and set-top-box devices may include controlling media playback.	
    // Recommended:

    // Volume
    // Required:

    // AppSelector
    // MediaState
    // Channel
    // OnOff
    // TransportControl
    static SETTOP = "SETTOP";

    // 	Showers can be turned on and off and may support adjusting temperature.	
    // Recommended:

    // StartStop
    // TemperatureControl
    static SHOWER = "SHOWER";

    // 	Shutters can be opened and closed, potentially in more than one direction. Some shutters may have slats that can be rotated.	
    // Recommended:

    // Rotation
    // Required:

    // OpenClose
    static SHUTTER = "SHUTTER";

    // 	Smoke detectors can report whether smoke is currently detected, whether the smoke level is high, and the current smoke level in parts per million.	
    // Required:

    // SensorState
    static SMOKE_DETECTOR = "SMOKE_DETECTOR";

    // 	An all-in-one audio device that is often used in conjunction with a TV and has a bar form factor.	
    // Recommended:

    // AppSelector
    // InputSelector
    // Required:

    // MediaState
    // OnOff
    // TransportControl
    // Volume
    static SOUNDBAR = "SOUNDBAR";

    // 	Interactions with sous vides may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.	
    // Recommended:

    // Cook
    // StartStop
    // Timer
    // Required:

    // OnOff
    static SOUSVIDE = "SOUSVIDE";

    // 	This device is a connected speaker that does not split audio into separate channels (for example, between two left and right devices).	
    // Recommended:

    // AppSelector
    // InputSelector
    // Required:

    // MediaState
    // OnOff
    // TransportControl
    // Volume
    static SPEAKER = "SPEAKER";

    // 	Sprinklers can start and stop (or turn on and off). They may also support timers and/or schedules.	
    // Recommended:

    // Timer
    // Required:

    // StartStop
    static SPRINKLER = "SPRINKLER";

    // 	Interactions with stand mixers may include turning mixers on and off, starting and stopping the mixer, adjusting cooking modes or food presets, or adjusting various non-cooking mode settings.	
    // Recommended:

    // Cook
    // StartStop
    // Required:

    // OnOff
    static STANDMIXER = "STANDMIXER";

    // 	This device enables streaming services for media and music, often used in conjunction with a display such as a TV. This devices is powered from a constant source, separate from the display device itself.	
    // Recommended:

    // Channel
    // InputSelector
    // Required:

    // AppSelector
    // MediaState
    // OnOff
    // TransportControl
    // Volume
    static STREAMING_BOX = "STREAMING_BOX";

    // 	This device is a combination of speaker and streaming stick or box. This device provides a streaming experience in addition to soundbar capabilities.	
    // Recommended:

    // InputSelector
    // Required:

    // AppSelector
    // MediaState
    // OnOff
    // TransportControl
    // Volume
    static STREAMING_SOUNDBAR = "STREAMING_SOUNDBAR";

    // 	This device has a small stick-like form factor that is usually powered by a USB or HDMI cable connected to a display such as a TV.	
    // Recommended:

    // OnOff
    // Required:

    // AppSelector
    // MediaState
    // TransportControl
    // Volume
    static STREAMING_STICK = "STREAMING_STICK";

    // 	Switch, a basic device in Smart Home, can be turned on and off.	
    // Recommended:

    // Brightness
    // Required:

    // OnOff
    static SWITCH = "SWITCH";

    // 	Thermostats are temperature-managing devices, with set points and modes. This separates them from heaters and AC units which may only have modes and settings (for example, high/low) vs a temperature target.	
    // Required:

    // TemperatureSetting
    static THERMOSTAT = "THERMOSTAT";

    // 	Television devices combine a tuner, display, and loudspeakers for the purpose of viewing and hearing media. Examples include smart TV devices.	
    // Recommended:

    // Channel
    // Required:

    // AppSelector
    // InputSelector
    // MediaState
    // OnOff
    // TransportControl
    // Volume
    static TV = "TV";

    // 	Vacuums may have functions such as starting, stopping, and pausing cleaning, docking, checking the current cleaning cycle, locating the vacuum, or adjusting various modes. Some vacuums may support cleaning specific zones in the home.	
    // Recommended:

    // Dock
    // EnergyStorage
    // Locator
    // OnOff
    // RunCycle
    // Required:

    // StartStop
    static VACUUM = "VACUUM";

    // 	Valves can be opened and closed.	
    // Required:

    // OpenClose
    static VALVE = "VALVE";

    // 	Washers can have start and stop functionality independent from being on or off (some washers have separate power buttons, and some do not). Some can be paused and resumed while washing. Washers also have various modes and each mode has its own related settings. These are specific to the washer and are interpreted in a generalized form.	
    // Recommended:

    // Modes
    // OnOff
    // RunCycle
    // Toggles
    // Required:

    // StartStop
    static WASHER = "WASHER";

    // 	Water heaters are devices used to heat water. They may turn on and off and adjust water temperature.	
    // Recommended:

    // TemperatureControl
    // Required:

    // OnOff
    static WATERHEATER = "WATERHEATER";

    // 	Water purifiers are devices that may be turned on and off, report water filter cleanliness and filter lifetime, and be adjusted to various mode settings.	
    // Recommended:

    // OnOff
    // SensorState
    static WATERPURIFIER = "WATERPURIFIER";

    // 	Water softeners are devices that may be turned on and off, report water filter cleanliness and filter lifetime, and be adjusted to various mode settings.	
    // Recommended:

    // OnOff
    // SensorState
    static WATERSOFTENER = "WATERSOFTENER";

    // 	Windows can be opened and closed, optionally with sections that open in different directions, and may also be locked and unlocked.	
    // Recommended:

    // LockUnlock
    // Required:

    // OpenClose
    static WINDOW = "WINDOW";

    // 	Interactions with yogurt makers may include starting and stopping, setting a timer, adjusting cooking modes or food presets, or adjusting other various settings.	
    // Recommended:

    // Cook
    // StartStop
    // Timer
    // Required:

    // OnOff
    static YOGURTMAKER = "YOGURTMAKER";
}


export class GoogleDeviceTraits {

    static AppSelector = "action.devices.traits.AppSelector";

    static ArmDisarm = "action.devices.traits.ArmDisarm";
    static Brightness = "action.devices.traits.Brightness";
    static CameraStream	 = "action.devices.traits.CameraStream";
    static Channel = "action.devices.traits.Channel";
    static ColorSetting	= "action.devices.traits.ColorSetting";
    static ColorSpectrum = "action.devices.traits.ColorSpectrum";
    static ColorTemperature	= "action.devices.traits.ColorTemperature";
    static Cook	= "action.devices.traits.Cook";
    static Dispense	= "action.devices.traits.Dispense";
    static Dock	= "action.devices.traits.Dock";
    static EnergyStorage = "action.devices.traits.EnergyStorage";
    static FanSpeed = "action.devices.traits.FanSpeed";
    static Fill = "action.devices.traits.Fill";
    static HumiditySetting = "action.devices.traits.HumiditySetting";
    static InputSelector = "action.devices.traits.InputSelector";
    static LightEffects	= "action.devices.traits.LightEffects";
    static Locator = "action.devices.traits.Locator";
    static LockUnlock = "action.devices.traits.LockUnlock";
    static MediaState = "action.devices.traits.MediaState";
    static Modes = "action.devices.traits.Modes";
    static NetworkControl = "action.devices.traits.NetworkControl";
    static ObjectDetection = "action.devices.traits.ObjectDetection";
    static OnOff = "action.devices.traits.OnOff";
    static OpenClose = "action.devices.traits.OpenClose";
    static Reboot = "action.devices.traits.Reboot";
    static Rotation	= "action.devices.traits.Rotation";
    static RunCycle	 = "action.devices.traits.RunCycle";
    static SensorState = "action.devices.traits.SensorState";
    static Scene = "action.devices.traits.Scene";
    static SoftwareUpdate = "action.devices.traits.SoftwareUpdate";
    static StartStop = "action.devices.traits.StartStop";
    static StatusReport	 = "action.devices.traits.StatusReport";
    static TemperatureControl = "action.devices.traits.TemperatureControl";
    static TemperatureSetting = "action.devices.traits.TemperatureSetting";
    static Timer = "action.devices.traits.Timer";
    static Toggles = "action.devices.traits.Toggles";
    static TransportControl	= "action.devices.traits.TransportControl";
    static Volume = "action.devices.traits.Volume";
}

export class DeviceCommandCodeTuya {
    static switch_led = 'switch_led';
    static control = 'control';
    static percent_control = 'percent_control';
    static control_back = 'control_back';
    static bright_value = 'bright_value';
    static flash_scene_1 = 'flash_scene_1';
    static work_mode = 'work_mode';
    static temp_value = 'temp_value';
    static colour_data = 'colour_data';
    static scene_data = 'scene_data';
    
}

export class GoogleCommandExecute {
    static OnOff = 'action.devices.commands.OnOff';
    static BrightnessAbsolute = 'action.devices.commands.BrightnessAbsolute';
    static StartStop = 'action.devices.commands.StartStop';
    static RunCycle = 'action.devices.commands.RunCycle';
    static ColorAbsolute = 'action.devices.commands.ColorAbsolute';
    static PauseUnpause = 'action.devices.commands.PauseUnpause';
    static SetFanSpeed = 'action.devices.commands.SetFanSpeed';
    static ThermostatTemperatureSetpoint = 'action.devices.commands.ThermostatTemperatureSetpoint';
    static ThermostatSetMode = 'action.devices.commands.ThermostatSetMode';
    static SetHumidity = 'action.devices.commands.SetHumidity';
    static SetToggles = 'action.devices.commands.SetToggles';
    static SetModes = 'action.devices.commands.SetModes';
    static SensorState = 'action.devices.commands.SensorState';
    static AppInstall = 'action.devices.commands.appInstall';
    static AppSearch = 'action.devices.commands.appSearch';
    static AppSelect = 'action.devices.commands.appSelect';
    static SetInput = 'action.devices.commands.setInput';
    static MediaClosedCaptioningOff = 'action.devices.commands.mediaClosedCaptioningOff';
    static MediaClosedCaptioningOn = 'action.devices.commands.mediaClosedCaptioningOn';
    static MediaNext = 'action.devices.commands.mediaNext';
    static MediaPause = 'action.devices.commands.mediaPause';
    static MediaPrevious = 'action.devices.commands.mediaPrevious';
    static MediaResume = 'action.devices.commands.mediaResume';
    static MediaStop = 'action.devices.commands.mediaStop';
    static Mute = 'action.devices.commands.mute';
    static SetVolume = 'action.devices.commands.setVolume';
    static RelativeChannel = 'action.devices.commands.relativeChannel';
    static ReturnChannel = 'action.devices.commands.returnChannel';
    static PreviousInput = 'action.devices.commands.PreviousInput';
    static NextInput = 'action.devices.commands.NextInput';
    static Dock = 'action.devices.commands.Dock';
    static SetTemperature = 'action.devices.commands.SetTemperature';
    static LockUnlock = 'action.devices.commands.LockUnlock';
    static Cook = 'action.devices.commands.Cook';
    static TimerStart = 'action.devices.commands.TimerStart';
    static TimerAdjust = 'action.devices.commands.TimerAdjust';
    static TimerPause = 'action.devices.commands.TimerPause';
    static TimerResume = 'action.devices.commands.TimerResume';
    static TimerCancel = 'action.devices.commands.TimerCancel';

    //sence
    static ActivateScene = 'action.devices.commands.ActivateScene';
}